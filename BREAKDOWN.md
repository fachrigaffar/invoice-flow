# InvoiceFlow — Project Breakdown & Timeline

> Multi-tenant Invoice & Billing SaaS | Laravel 11 + Next.js 14 + Stripe

---

## Ringkasan Project

| Item | Detail |
|------|--------|
| **Durasi** | 4 minggu (solo developer) |
| **Jumlah modul** | 6 modul core |
| **Backend** | Laravel 11, PHP 8.3, MySQL/PostgreSQL |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Payment** | Stripe (Checkout + Billing) |
| **Target** | Freelancer, SMB, Agency |

---

## Minggu 1 — Foundation & Auth

**Goal:** Setup project, multi-tenancy, dan auth flow berjalan end-to-end.

### Day 1–2: Project Setup

- [ ] Init Laravel 11 project + konfigurasi database
- [ ] Init Next.js 14 project (App Router + TypeScript)
- [ ] Setup Tailwind CSS, Zustand, React Query
- [ ] Konfigurasi environment (`.env`, Docker compose untuk local dev)
- [ ] Setup koneksi API (Axios instance, base URL, interceptor)
- [ ] Setup Pest PHP untuk testing

### Day 3–4: Multi-tenancy

- [ ] Buat migration `tenants` table (name, subdomain, plan, stripe_customer_id)
- [ ] Buat migration `users` table (tenant_id FK, name, email, role)
- [ ] Multi-tenant middleware — resolve tenant dari subdomain
- [ ] Tenant-scoped query (global scope pada Eloquent model)
- [ ] Wildcard subdomain routing (`*.invoiceflow.app`)

### Day 5: Auth Flow

- [ ] Install & konfigurasi Laravel Sanctum
- [ ] Register endpoint — buat user + tenant + workspace sekaligus
- [ ] Login endpoint — return Sanctum token
- [ ] Logout endpoint — revoke token
- [ ] Auth middleware untuk protected routes
- [ ] Frontend: halaman Register & Login
- [ ] Frontend: auth state management (Zustand store + token di cookie/localStorage)

### Day 6–7: Roles & Workspace Settings

- [ ] Install & konfigurasi Spatie Laravel Permission
- [ ] Definisi roles: `owner`, `admin`, `member`
- [ ] Invite member endpoint (`POST /api/auth/invite`)
- [ ] Workspace settings endpoint (nama, logo, currency default)
- [ ] Frontend: halaman Workspace Settings
- [ ] Frontend: halaman Invite Member
- [ ] **Testing:** feature test auth flow + multi-tenant isolation

### Deliverable Minggu 1
- User bisa register, login, invite member
- Subdomain routing berfungsi
- Role-based access control aktif
- Workspace settings bisa diubah

---

## Minggu 2 — Core Invoice Engine

**Goal:** CRUD clients & products, invoice builder, PDF export, basic dashboard.

### Day 8–9: Client & Product Management

- [ ] Migration `clients` table (tenant_id, name, email, phone, address, currency)
- [ ] Migration `products` table (tenant_id, name, price, unit, tax_rate)
- [ ] CRUD API clients (`GET/POST/PUT/DELETE /api/clients`)
- [ ] CRUD API products (`GET/POST/PUT/DELETE /api/products`)
- [ ] Multi-currency support (USD, EUR, IDR)
- [ ] Frontend: halaman Client List + Form (React Hook Form + Zod validation)
- [ ] Frontend: halaman Product Catalog + Form
- [ ] **Testing:** feature test CRUD + tenant isolation

### Day 10–12: Invoice Builder

- [ ] Migration `invoices` table (tenant_id, client_id, number, status, issue_date, due_date, subtotal, tax, discount, total)
- [ ] Migration `invoice_items` table (invoice_id, product_id, description, qty, unit_price, tax_rate, amount)
- [ ] Auto-numbering logic (INV-0001, INV-0002, per tenant)
- [ ] Invoice CRUD API (`GET/POST/PUT /api/invoices`)
- [ ] Tax & discount calculation logic (backend)
- [ ] Status machine: `draft` → `sent` → `paid` → `overdue`
- [ ] Filter invoice by status
- [ ] Frontend: Invoice Builder form dengan dynamic line items
- [ ] Frontend: auto-calculate subtotal, tax, discount, total
- [ ] Frontend: Invoice List page dengan status badge & filter

### Day 13: PDF Export

- [ ] Install DomPDF
- [ ] Buat invoice PDF template (branded per tenant — logo, warna, info)
- [ ] Endpoint `GET /api/invoices/{id}/pdf` — generate & download PDF
- [ ] Frontend: tombol "Download PDF" di invoice detail

### Day 14: Basic Dashboard

- [ ] Dashboard API — revenue overview (total, outstanding, paid bulan ini)
- [ ] Dashboard API — invoice count by status
- [ ] Frontend: Dashboard page dengan metric cards
- [ ] Frontend: Invoice table (recent invoices)
- [ ] **Testing:** feature test invoice CRUD, calculation, PDF

### Deliverable Minggu 2
- CRUD clients & products berfungsi
- Invoice builder dengan dynamic line items
- Auto-numbering & kalkulasi otomatis
- PDF export branded per tenant
- Basic dashboard dengan metric cards

---

## Minggu 3 — Payment & Subscription

**Goal:** Stripe Checkout per invoice, webhook, public payment page, SaaS subscription.

### Day 15–16: Stripe Checkout Integration

- [ ] Install Stripe PHP SDK
- [ ] Konfigurasi Stripe keys di `.env`
- [ ] Endpoint `POST /api/invoices/{id}/checkout` — buat Stripe Checkout Session
- [ ] Migration `payments` table (invoice_id, amount, method, stripe_payment_id, paid_at)
- [ ] Stripe webhook controller (`POST /api/webhooks/stripe`)
- [ ] Webhook handler: `checkout.session.completed` → update invoice status ke `paid`, simpan payment record
- [ ] Partial payment support
- [ ] Setup Stripe CLI untuk webhook testing lokal

### Day 17–18: Public Payment Page

- [ ] Generate unique token per invoice
- [ ] Public route `GET /invoices/pay/{token}` — no auth required
- [ ] Frontend: Public Invoice View (detail invoice + tombol "Pay Now")
- [ ] Redirect ke Stripe Checkout dari public page
- [ ] Success & cancel page setelah payment
- [ ] Payment history per invoice
- [ ] Frontend: Payment History di invoice detail

### Day 19–20: SaaS Subscription (Laravel Cashier)

- [ ] Install Laravel Cashier
- [ ] Konfigurasi Stripe Billing products & prices
- [ ] Migration `subscriptions` table (tenant_id, stripe_subscription_id, plan, status, trial_ends_at, ends_at)
- [ ] Endpoint `GET /api/subscription` — status plan aktif
- [ ] Endpoint `POST /api/subscription/upgrade` — upgrade ke Pro
- [ ] Endpoint `POST /api/subscription/cancel` — cancel subscription
- [ ] Webhook handler: subscription events (created, updated, deleted)

### Day 21: Feature Gating

- [ ] Plan-based middleware (cek limit berdasarkan plan)
- [ ] Free plan: maks 5 invoice/bulan, 1 user
- [ ] Pro plan: unlimited invoice, custom branding, team members
- [ ] Grace period & cancellation handling
- [ ] Frontend: Subscription/Billing page (current plan, upgrade button)
- [ ] Frontend: gate UI elements berdasarkan plan
- [ ] **Testing:** feature test payment flow, subscription, feature gating

### Deliverable Minggu 3
- Payment via Stripe Checkout berfungsi
- Webhook auto-update status invoice
- Public payment page untuk klien
- SaaS subscription (Free & Pro plan)
- Feature gating berdasarkan plan

---

## Minggu 4 — Email, Polish & Deploy

**Goal:** Email notifications, reporting charts, CSV export, deployment, demo data.

### Day 22–23: Email Notification & Automation

- [ ] Konfigurasi Mailgun / Resend
- [ ] Endpoint `POST /api/invoices/{id}/send` — kirim invoice via email (PDF attachment)
- [ ] Email template per workspace (custom logo & warna)
- [ ] Laravel Mailable class untuk invoice email
- [ ] Queue job: reminder otomatis H-3 sebelum due date
- [ ] Queue job: reminder otomatis H-1 sebelum due date
- [ ] Queue job: pengiriman massal
- [ ] Setup Laravel Queue + Redis
- [ ] **Testing:** feature test email dispatch & queue

### Day 24–25: Dashboard & Reporting

- [ ] API: Revenue overview (monthly trend)
- [ ] API: Invoice aging (by status + hari overdue)
- [ ] API: Top clients (revenue per klien)
- [ ] API: Payment history log
- [ ] Frontend: Revenue chart (Recharts — line/bar chart)
- [ ] Frontend: Invoice aging table
- [ ] Frontend: Top clients bar chart
- [ ] Frontend: Payment history table
- [ ] CSV export endpoint — download invoice history per periode
- [ ] Frontend: Export CSV button

### Day 26: Overdue Scheduler

- [ ] Laravel scheduler — cron job cek invoice overdue
- [ ] Auto-update status `sent` → `overdue` jika lewat due date
- [ ] Overdue notification email ke tenant owner

### Day 27–28: Deploy & Polish

- [ ] Setup Docker (Dockerfile backend + docker-compose)
- [ ] Deploy backend ke Railway / Fly.io
- [ ] Deploy frontend ke Vercel
- [ ] Konfigurasi environment variables production
- [ ] Setup custom domain & wildcard subdomain
- [ ] SSL certificate
- [ ] GitHub Actions CI/CD pipeline (lint, test, deploy)
- [ ] Demo data seeding (tenant, users, clients, invoices, payments)
- [ ] Final QA — test semua flow end-to-end
- [ ] Install Laravel Telescope untuk debugging (staging only)

### Deliverable Minggu 4
- Email invoice dengan PDF attachment
- Reminder otomatis (H-3, H-1)
- Dashboard charts & reporting lengkap
- CSV export
- Deployed & accessible via custom subdomain
- Demo data siap untuk portfolio showcase

---

## Checklist Final

- [ ] Semua 6 modul berfungsi end-to-end
- [ ] Multi-tenancy isolation terjamin (data tidak bocor antar tenant)
- [ ] Stripe payment & subscription flow berjalan
- [ ] Email notification & reminder queue berjalan
- [ ] PDF export branded per tenant
- [ ] Responsive UI (mobile & desktop)
- [ ] Feature test coverage untuk critical paths
- [ ] CI/CD pipeline aktif
- [ ] Production deployment stabil
- [ ] Demo data & seeder siap
- [ ] README dokumentasi lengkap
- [ ] Loom demo video untuk Upwork portfolio

---

## Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Wildcard subdomain setup kompleks | Delay deploy | Mulai konfigurasi DNS & hosting dari minggu 1 |
| Stripe webhook unreliable di dev | Payment status tidak update | Gunakan Stripe CLI untuk local testing |
| Email delivery masuk spam | Klien tidak terima invoice | Setup SPF/DKIM records, gunakan Mailgun/Resend |
| Multi-tenant data leak | Security breach | Global scope Eloquent + integration test per tenant |
| Plan limit bypass | Revenue loss | Server-side validation, jangan hanya frontend gating |

---

*Last updated: 2026-04-21*
