# Alva production backend on 1Panel

This package creates a separate production Vendure stack. It does not reuse the staging containers, database, volumes, or hostname.

## Before deployment

1. Create DNS record `api.alvatechnology.se` pointing to the same server as the website.
2. Extract the release ZIP into its own directory, then copy the root `.env.example` to root `.env`.
3. Replace every placeholder. `DB_PASSWORD` and `POSTGRES_PASSWORD` must be identical.
4. Set `SALES_EMAIL=admin@alvatechnology.se` and `MAIL_FROM_ADDRESS=info@alvatechnology.se`.
5. Create a Microsoft Entra application for server-side mail, grant the Microsoft Graph application permission `Mail.Send`, grant tenant admin consent, and place its tenant ID, client ID and secret in `.env`.
6. Restrict that application to the `info@alvatechnology.se` mailbox with Exchange Online RBAC for Applications (or an application access policy). Human shared-mailbox access alone does not authorize the website backend.
7. Keep `.env` private. Do not add it to Git or send it with screenshots.

## Start the isolated stack

Run from the extracted package root. The initialize command is required once for a new empty production database:

```bash
docker compose --env-file .env build
docker compose --env-file .env --profile initialize run --rm init
docker compose --env-file .env up -d
```

The one-time initialize service creates the empty Vendure schema, records the project migration, and seeds the Alva catalog, including Tracker and Voltrix FieldPack. Normal server starts keep `DB_SYNCHRONIZE=false` and run only checked-in migrations. Do not run the initialize profile against a populated production database.

The initialization command uses the compiled seed script included in the production image, so the runtime container does not depend on `ts-node` or any development dependency.

The production ZIP also includes the verified `dist` output and Dashboard assets. Its production Dockerfile installs Linux runtime dependencies but does not compile the Dashboard on the server, which keeps deployment reliable on the current 2 GB VM.

## 1Panel reverse proxy

Create a reverse-proxy website for `api.alvatechnology.se` and send traffic to `http://127.0.0.1:2606`. Enable HTTPS and redirect HTTP to HTTPS. Do not proxy the production hostname to the staging container.

## Verification

```bash
curl -fsS https://api.alvatechnology.se/health
curl -i -X OPTIONS https://api.alvatechnology.se/api/quote \
  -H 'Origin: https://alvatechnology.se' \
  -H 'Access-Control-Request-Method: POST'
```

Then sign in at `https://api.alvatechnology.se/dashboard`. The **Alva sales → Website inquiries** page shows stored submissions, notification delivery state, and follow-up state.

Submit one test inquiry from the production website. Confirm all three results:

- the frontend shows success and a reference is returned;
- the inquiry appears in the dashboard;
- the sales mailbox receives the notification.

## Rollback

Keep the previous backend directory until verification is complete. A frontend rollback only requires restoring its previous ZIP. The staging stack remains independent and should not be stopped or renamed during this deployment.
