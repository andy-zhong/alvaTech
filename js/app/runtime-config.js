export function getApiBaseUrl() {
  const configured = window.ALVA_API_BASE_URL;
  if (typeof configured === "string" && configured.trim()) {
    return configured.trim().replace(/\/$/, "");
  }
  return "";
}

export function apiUrl(path) {
  const normalizedPath = String(path || "").startsWith("/")
    ? String(path || "")
    : `/${path || ""}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
