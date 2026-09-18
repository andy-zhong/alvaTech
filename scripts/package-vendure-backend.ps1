param(
    [ValidateSet('production')]
    [string]$Environment = 'production'
)

$ErrorActionPreference = 'Stop'
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$sourceDir = Join-Path $repoRoot 'vendure'
$distDir = Join-Path $repoRoot 'dist'
$timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$stageDir = Join-Path $distDir "vendure-backend-$Environment-$timestamp"
$zipPath = Join-Path $distDir "alvatech-vendure-backend-$Environment-1panel-$timestamp.zip"
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path -LiteralPath $sourceDir)) {
    throw "Vendure source directory was not found: $sourceDir"
}

$requiredBuildArtifacts = @(
    (Join-Path $sourceDir 'dist\index.js'),
    (Join-Path $sourceDir 'dist\index-worker.js'),
    (Join-Path $sourceDir 'dist\scripts\seed-alva-catalog.js'),
    (Join-Path $sourceDir 'dist\dashboard\index.html')
)
foreach ($artifact in $requiredBuildArtifacts) {
    if (-not (Test-Path -LiteralPath $artifact)) {
        throw "Missing verified build artifact: $artifact. Run npm run build and npm run build:dashboard first."
    }
}

New-Item -ItemType Directory -Force -Path $distDir,$stageDir | Out-Null

$excludedDirectories = @('node_modules', '.vendure', 'test-emails')
$excludedFiles = @('.env', '.env.production', 'vendure.sqlite', 'inquiry-test.sqlite', 'production-init-test.sqlite')

Get-ChildItem -LiteralPath $sourceDir -Recurse -File | ForEach-Object {
    $relative = $_.FullName.Substring($sourceDir.Length).TrimStart('\', '/')
    $segments = $relative -split '[\\/]'
    if ($segments | Where-Object { $_ -in $excludedDirectories }) { return }
    if ($_.Name -in $excludedFiles) { return }

    $destination = Join-Path $stageDir $relative
    New-Item -ItemType Directory -Force -Path (Split-Path $destination -Parent) | Out-Null
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
}

# Make the extracted ZIP directly usable as a 1Panel Compose project. The
# checked-in production template lives under deploy/production, where its
# build context is ../..; at package root the equivalent context is '.'.
$productionDeployDir = Join-Path $sourceDir 'deploy\production'
$productionCompose = [System.IO.File]::ReadAllText(
    (Join-Path $productionDeployDir 'docker-compose.production.yml'),
    [System.Text.Encoding]::UTF8
)
$rootCompose = $productionCompose.Replace('context: ../..', 'context: .').Replace('env_file: .env.production', 'env_file: .env')
[System.IO.File]::WriteAllText((Join-Path $stageDir 'docker-compose.yml'), $rootCompose, $utf8NoBom)
Copy-Item -LiteralPath (Join-Path $productionDeployDir '.env.production.example') -Destination (Join-Path $stageDir '.env.example') -Force
Copy-Item -LiteralPath (Join-Path $productionDeployDir 'README-1PANEL.md') -Destination (Join-Path $stageDir 'README-1PANEL.md') -Force

# The source tree ignores dist because regular Docker builds compile it inside
# the image. This release intentionally ships a precompiled dist directory so
# the small production VM does not run Vite/TypeScript. Give the extracted
# 1Panel project its own build context rules and keep dist/static available.
$releaseDockerIgnore = @"
node_modules
.git
.env
release.zip
"@
[System.IO.File]::WriteAllText((Join-Path $stageDir '.dockerignore'), $releaseDockerIgnore, $utf8NoBom)

$manifest = @"
Package: Alva Vendure backend
Environment: $Environment
Created: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')
Public API hostname: https://api.alvatechnology.se
Deployment guide: README-1PANEL.md
Contains secrets: false
"@
[System.IO.File]::WriteAllText((Join-Path $stageDir 'package-info.txt'), $manifest, $utf8NoBom)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $stageDir -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($stageDir.Length).TrimStart('\', '/') -replace '\\', '/'
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $archive,
            $_.FullName,
            $relative,
            [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
    }
} finally {
    $archive.Dispose()
}

$resolvedStage = (Resolve-Path -LiteralPath $stageDir).Path
$resolvedDist = (Resolve-Path -LiteralPath $distDir).Path
if (-not $resolvedStage.StartsWith($resolvedDist, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove staging directory outside dist: $resolvedStage"
}
Remove-Item -LiteralPath $resolvedStage -Recurse -Force

$zip = Get-Item -LiteralPath $zipPath
[pscustomobject]@{
    Environment = $Environment
    Path = $zip.FullName
    SizeMB = [math]::Round($zip.Length / 1MB, 2)
    SHA256 = (Get-FileHash -LiteralPath $zip.FullName -Algorithm SHA256).Hash
} | Format-List
