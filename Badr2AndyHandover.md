# Alva Technology — Developer Handover

This document covers everything you need to know to take over, run, and maintain this project.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML, CSS, JavaScript (ES modules) |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Email | Gmail SMTP via Nodemailer |
| Auth (admin) | JWT (JSON Web Tokens) + bcrypt |

---

## Project Structure

```
ALVATECH/
├── .env                          ← Environment variables
├── index.html                    ← Homepage
├── views/                        ← All HTML pages
│   ├── products.html
│   ├── product.html
│   ├── buy-product.html
│   ├── checkout.html
│   ├── order-confirmation.html
│   ├── about.html
│   ├── account.html
│   ├── b2b.html
│   ├── privacy-policy.html
│   └── admin/
│       ├── login.html            ← Admin login
│       ├── orders.html           ← Admin order list
│       ├── order.html            ← Single order view
│       └── analytics.html        ← Anonymous analytics dashboard
├── js/
│   ├── main.js                   ← Entry point
│   ├── app/
│   │   └── bootstrap.js          ← App initialisation, page routing
│   ├── pages/                    ← One file per page (home, products, etc.)
│   ├── components/
│   │   ├── header.js
│   │   ├── footer.js
│   │   ├── floating-quote-widget.js
│   │   └── consent-banner.js     ← Cookie consent banner
│   ├── core/
│   │   ├── consent.js            ← Stores/reads user cookie consent
│   │   └── activity.js           ← Anonymous page/click tracking
│   ├── data/
│   │   ├── products.js           ← Main product index (imports from products/)
│   │   └── products/
│   │       ├── voltrix.js        ← Voltrix product data
│   │       ├── battery.js        ← Battery module product data
│   │       └── voltdock.js       ← VoltDock product data
│   └── services/
│       ├── product-service.js
│       └── language-service.js
├── css/
│   ├── styles.css                ← Main CSS entry (imports all others)
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── components/
│   │   └── consent-banner.css
│   └── pages/
│       ├── home.css
│       ├── detail.css
│       ├── checkout.css
│       └── admin.css
├── components/
│   └── navbar.html               ← Navbar HTML loaded dynamically
└── server/
    ├── server.js                 ← Express server entry point
    ├── db/
    │   ├── connection.js         ← PostgreSQL connection pool
    │   ├── schema.sql            ← Orders + admin users schema
    │   ├── analytics-schema.sql  ← Analytics tables schema
    │   └── seed.js               ← Creates the first admin user
    ├── routes/
    │   ├── auth.js               ← Customer register/login
    │   ├── admin.js              ← Admin login + order management API
    │   ├── orders.js             ← POST order from checkout form
    │   ├── b2b.js                ← B2B inquiry form
    │   ├── quote.js              ← Floating quote widget form
    │   ├── track.js              ← Anonymous analytics ingest (public)
    │   └── analytics.js          ← Analytics read endpoints (admin only)
    ├── middleware/
    │   ├── requireAdmin.js       ← JWT auth middleware for admin routes
    │   └── analyticsRateLimit.js ← Rate limiter for /api/track
    └── services/
        ├── email.js              ← Order confirmation emails
        └── geo.js                ← IP → country/city lookup (IP never stored)
```

---

## First-Time Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Set up the database

You need PostgreSQL running locally. Create the database if it does not exist:

```bash
createdb -U postgres alva_db
```

Then run both schema files to create all tables:

```bash
psql -U badr -d alva_db -f server/db/schema.sql
psql -U badr -d alva_db -f server/db/analytics-schema.sql
```

### 3. Create the admin user

```bash
cd server
node db/seed.js
```

> ⚠️ **IMPORTANT:** Before running this in production, update `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env` to real secure values. The default password fallback in `seed.js` is `changeme123` — this must never be used in production. Set a strong password in `.env` first, then run seed.

### 4. Configure environment variables

Copy the `.env` file (see section below) and fill in all values.

### 5. Start the server

```bash
cd server
npm run dev       # development (auto-restarts on file changes)
npm start         # production
```

The site runs at `http://localhost:3000`.

---

## Environment Variables (.env)

The `.env` file lives at the **project root** (one level above `server/`). The server loads it with `../env`.

```
EMAIL_USER=badr.z.azam@gmail.com        ← REPLACE: sending email address
EMAIL_PASS=rdgpmwazgdfyfuwz             ← REPLACE: Gmail app password for above

SALES_EMAIL=email1@gmail.com,email2@gmail.com  ← receives B2B + quote inquiries

JWT_SECRET=alva_super_secret_...        ← REPLACE: generate a new random string

DB_USER=badr                            ← PostgreSQL username
DB_HOST=localhost
DB_NAME=alva_db
DB_PASSWORD=                            ← PostgreSQL password (blank = no password)
DB_PORT=5432

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=badr.z.azam@gmail.com         ← REPLACE: same as EMAIL_USER
SMTP_PASS=rdgpmwazgdfyfuwz             ← REPLACE: same as EMAIL_PASS

COMPANY_EMAIL=orders@alvatechnology.com ← receives order confirmation copies

FRONTEND_URL=http://localhost:3000      ← UPDATE to real domain in production
CORS_ORIGIN=*                           ← restrict to your domain in production

ADMIN_EMAIL=admin@alvatechnology.com    ← REPLACE with real admin email
ADMIN_PASSWORD=Admin123!                ← REPLACE with a strong password
ADMIN_NAME=Alva Admin
```

### Things that MUST be replaced before going live

| Variable | What to do |
|---|---|
| `EMAIL_USER` / `SMTP_USER` | Replace `badr.z.azam@gmail.com` with the company's sending email |
| `EMAIL_PASS` / `SMTP_PASS` | Generate a new Gmail App Password for that email |
| `JWT_SECRET` | Generate a new random string: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `ADMIN_EMAIL` | Set to the real admin email |
| `ADMIN_PASSWORD` | Set a strong unique password, then re-run `node db/seed.js` |
| `FRONTEND_URL` | Set to the real domain, e.g. `https://alvatechnology.com` |
| `CORS_ORIGIN` | Set to the real domain instead of `*` |

### How Gmail App Passwords work

Gmail blocks direct password login for apps. You need an App Password:

1. Go to your Google account → Security → 2-Step Verification (must be enabled)
2. Go to Security → App Passwords
3. Create a new app password for "Mail"
4. Paste that 16-character code into `SMTP_PASS` and `EMAIL_PASS`

---

## Admin Panel

URL: `/views/admin/login.html`

Log in with the credentials set in `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

### What the admin can do

- **Orders** — view all orders, open individual orders, update order status (New → Confirmed → Processing → Shipped → Delivered → Cancelled)
- **Analytics** — view anonymous site statistics: sessions, pageviews, clicks, top pages, top clicked elements, sessions by country

### Resetting the admin password

Update `ADMIN_PASSWORD` in `.env`, then run:

```bash
cd server
node db/seed.js
```

This updates the password in the database without deleting anything else.

---

## Adding or Updating Products

Products are defined in `js/data/products/`. Each product has its own file:

- `voltrix.js` — Voltrix Energy System (configurable, 1–12 battery modules)
- `battery.js` — Standalone battery modules (configurable, 1–10 units)
- `voltdock.js` — VoltDock desktop hub (fixed price)

To add a new product:

1. Create `js/data/products/yourproduct.js` — copy the structure from `voltdock.js`
2. Add `import` and add to the `PRODUCTS` array in `js/data/products.js`
3. The product automatically appears in the homepage carousel, navbar dropdown, products page, and buy hub

Each product file contains:
- `slug` — URL identifier (must be unique)
- `heroImage` — path to hero image
- `gallery` — array of images
- `price` — display price string
- `config` — set to `null` for fixed-price products, or an object with `basePrice`, `batteryPrice`, `minBatteries`, `maxBatteries`, `capacityPerBattery` for configurable products
- `basePrice` — used for fixed-price products when `config` is null
- `translations.en` and `translations.sv` — content in each language

---

## Languages

The site supports: English, Swedish, Finnish, Norwegian, Danish.

All UI translations live in `js/data/i18n.js`. To add a translation key, add it to all 5 language objects in that file.

The selected language is stored in `localStorage` under `alva-consent`.

---

## Analytics (GDPR-compliant)

The analytics system tracks anonymous usage data — no personal information is stored.

**What is tracked:**
- Page views
- Button and link clicks
- Time spent on pages
- Approximate country and city (derived from IP at request time — the IP itself is never stored)

**What is never tracked:**
- IP addresses (long-term)
- Names, emails, or any personal data
- Anything before the user accepts the cookie banner

**Data retention:** Analytics data is automatically deleted after 90 days. To automate this, set up a daily cron job:

```bash
psql -U badr -d alva_db -c "DELETE FROM analytics_sessions WHERE created_at < NOW() - INTERVAL '90 days';"
```

**Cookie consent:** Users see a banner on first visit and can accept, reject, or customise. Their choice is stored in `localStorage` under `alva-consent`. A 🍪 button in the bottom-left corner lets them change their preference at any time.

---

## Database Tables

| Table | Purpose |
|---|---|
| `orders` | Customer orders from the checkout form |
| `order_items` | Individual line items within each order |
| `admin_users` | Admin login credentials (bcrypt hashed) |
| `analytics_sessions` | Anonymous visitor sessions |
| `analytics_events` | Individual page views, clicks, engagement events |

---

## Order Flow

```
Product page
  → Add to cart (localStorage)
  → Cart page (/views/buy-product.html)
  → Checkout form (/views/checkout.html)
  → POST /api/orders
  → Saved to database
  → Confirmation email to customer
  → Notification email to COMPANY_EMAIL
  → Order confirmation page
```

---

## Known Notes

- The site is served as static files by Express from the project root. No separate web server needed.
- The floating quote widget (bottom-right) sends inquiries to `SALES_EMAIL`.
- The B2B form (`/views/b2b.html`) also sends to `SALES_EMAIL`.
- Admin JWT tokens expire after 8 hours. Log in again when prompted.
- `geoip-lite` uses an offline database for IP geolocation — no external API calls are made.

---

## Useful Commands

```bash
# Start server (development)
cd server && npm run dev

# Start server (production)
cd server && npm start

# Create/reset admin user
cd server && node db/seed.js

# Run database schema (first time or after reset)
psql -U badr -d alva_db -f server/db/schema.sql
psql -U badr -d alva_db -f server/db/analytics-schema.sql

# Open database CLI
psql -U badr -d alva_db

# View recent orders
psql -U badr -d alva_db -c "SELECT id, order_number, first_name, last_name, total, status FROM orders ORDER BY created_at DESC LIMIT 10;"

# View recent analytics
psql -U badr -d alva_db -c "SELECT type, page, element, created_at FROM analytics_events ORDER BY created_at DESC LIMIT 20;"

# Generate a new JWT_SECRET
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```