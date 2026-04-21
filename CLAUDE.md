# InvoiceFlow — Multi-tenant Invoice & Billing SaaS

> Project portfolio untuk Upwork | Laravel + Next.js + Stripe

---

## Overview

Platform SaaS untuk freelancer dan bisnis kecil mengelola invoice, klien, dan pembayaran. Setiap tenant punya workspace sendiri dengan custom branding dan subdomain.

| | |
|---|---|
| **Estimasi waktu** | 3–4 minggu (solo developer) |
| **Jumlah modul** | 6 modul core |
| **Target client** | Freelancer, SMB, Agency |
| **Differentiator** | Dual-layer Stripe + multi-tenant subdomain |

---

## Tech Stack

### Backend
- Laravel 11, PHP 8.3
- Laravel Sanctum (auth)
- Spatie Laravel Permission (roles)
- Laravel Cashier (SaaS subscription)
- DomPDF (PDF export)
- Laravel Queue + Redis
- MySQL / PostgreSQL

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Query (data fetching)
- Recharts (dashboard charts)
- React Hook Form + Zod

### Services & Infra
- Stripe (payment + subscription billing)
- Mailgun / Resend (email delivery)
- Vercel (frontend deploy)
- Railway / Fly.io (backend deploy)
- Docker + GitHub Actions (CI/CD)

### Dev Tools
- Pest PHP / PHPUnit (testing)
- Laravel Telescope (debugging)
- Filament (admin panel)
- Stripe CLI (webhook testing)
- Postman (API testing)

---

## Modul & Fitur

### 1. Auth & Multi-tenancy
- Register / login per tenant
- Invite team member dengan role (owner, admin, member)
- Custom subdomain per workspace (`acme.invoiceflow.app`)
- Business profile & workspace settings
- **Stack:** Laravel Sanctum · Spatie Permission

### 2. Client & Product Management
- CRUD klien dengan info lengkap (nama, email, alamat, currency)
- Product / service catalog per workspace
- Tax rate per item
- Multi-currency support (USD, EUR, IDR)
- **Stack:** Laravel Eloquent · MySQL

### 3. Invoice Builder
- Form builder dengan dynamic line items
- Auto-numbering invoice (INV-0001, INV-0002...)
- Due date, discount (%), dan tax calculation otomatis
- Status machine: `draft` → `sent` → `paid` → `overdue`
- PDF export per invoice (branded per tenant)
- Public invoice link untuk klien
- **Stack:** Laravel DomPDF · Next.js

### 4. Payment Integration (Stripe)
- Payment link per invoice → Stripe Checkout hosted page
- Webhook handler: auto-update status invoice jadi `paid`
- Partial payment support
- Payment history per invoice
- **Stack:** Stripe SDK · Laravel Webhook Controller

### 5. SaaS Subscription (Meta-layer)
- Free plan: maks 5 invoice/bulan, 1 user
- Pro plan: unlimited invoice, custom branding, team member
- Upgrade / downgrade plan via Stripe Billing
- Grace period & cancellation handling
- **Stack:** Laravel Cashier · Stripe Billing

### 6. Email Notification & Automation
- Kirim invoice via email ke klien (PDF attachment)
- Reminder otomatis H-3 dan H-1 sebelum due date
- Queue job untuk pengiriman massal
- Email template per workspace (custom logo & warna)
- **Stack:** Laravel Queue · Mailgun / Resend

---

## Dashboard & Reporting

| Widget | Deskripsi |
|--------|-----------|
| Revenue overview | Total revenue, outstanding, dan paid bulan ini |
| Invoice aging | Tabel invoice by status + berapa hari overdue |
| Top clients | Revenue per klien, bar chart monthly |
| Payment history | Log semua transaksi masuk |
| Export CSV | Download invoice history per periode |

---

## Database Schema (Ringkasan)

```
tenants
  id, name, subdomain, plan, stripe_customer_id, ...

users
  id, tenant_id (FK), name, email, role, ...

clients
  id, tenant_id (FK), name, email, phone, currency, ...

products
  id, tenant_id (FK), name, price, unit, tax_rate, ...

invoices
  id, tenant_id (FK), client_id (FK), number, status,
  issue_date, due_date, subtotal, tax, discount, total, ...

invoice_items
  id, invoice_id (FK), product_id (FK), description,
  qty, unit_price, tax_rate, amount, ...

payments
  id, invoice_id (FK), amount, method, stripe_payment_id,
  paid_at, ...

subscriptions
  id, tenant_id (FK), stripe_subscription_id, plan,
  status, trial_ends_at, ends_at, ...
```

---

## API Endpoints (Ringkasan)

### Auth
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/register` | Daftar akun + buat workspace |
| POST | `/api/auth/login` | Login, return Sanctum token |
| POST | `/api/auth/logout` | Revoke token |
| POST | `/api/auth/invite` | Invite member ke workspace |

### Clients
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/clients` | List semua klien |
| POST | `/api/clients` | Tambah klien baru |
| PUT | `/api/clients/{id}` | Update klien |
| DELETE | `/api/clients/{id}` | Hapus klien |

### Invoices
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/invoices` | List invoice (filter by status) |
| POST | `/api/invoices` | Buat invoice baru |
| GET | `/api/invoices/{id}` | Detail invoice |
| PUT | `/api/invoices/{id}` | Update invoice (draft only) |
| POST | `/api/invoices/{id}/send` | Kirim invoice via email |
| GET | `/api/invoices/{id}/pdf` | Download PDF |
| GET | `/invoices/pay/{token}` | Public payment page (no auth) |

### Payments (Stripe)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/invoices/{id}/checkout` | Buat Stripe Checkout session |
| POST | `/api/webhooks/stripe` | Stripe webhook handler |

### Subscription
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/subscription` | Status plan aktif |
| POST | `/api/subscription/upgrade` | Upgrade ke Pro |
| POST | `/api/subscription/cancel` | Batalkan subscription |

---

## Timeline Pengerjaan

### Minggu 1 — Foundation & Auth
- Setup Laravel 11 + Next.js 14 (monorepo / separate repo)
- Multi-tenant middleware (resolve tenant dari subdomain)
- Auth flow: register, login, invite member
- Role & permission dengan Spatie
- Workspace settings (nama, logo, currency default)

### Minggu 2 — Core Invoice Engine
- CRUD clients & product catalog
- Invoice builder dengan dynamic line items
- Auto-numbering, tax, discount calculation
- Status machine (`draft` → `sent` → `paid` → `overdue`)
- PDF export dengan DomPDF (branded per tenant)
- Basic dashboard (metric cards + tabel invoice)

### Minggu 3 — Payment & Subscription
- Stripe Checkout integration per invoice
- Webhook handler → auto-update status `paid`
- Public invoice page (`/invoices/pay/{token}`)
- Laravel Cashier untuk SaaS subscription
- Upgrade/downgrade plan flow
- Plan-based feature gating (invoice limit, dll)

### Minggu 4 — Polish, Email & Deploy
- Email notification (kirim invoice + reminder queue)
- Custom email template per tenant
- Reporting chart dengan Recharts
- CSV export
- Deploy: Vercel (frontend) + Railway (backend)
- Demo data seeding untuk portfolio showcase
- README + Loom demo video

---

## Nilai Jual untuk Upwork

- **Dual-layer Stripe** — bukan hanya payment, tapi juga billing SaaS plan. Ini differentiator yang kuat.
- **Multi-tenancy dengan subdomain** — bukan hanya tenant ID di URL, tapi custom subdomain per workspace. Ini production-grade architecture.
- **Full-stack ownership** — dari database schema, REST API, sampai UI komponen. Tidak ada dependency ke third-party builder.
- **Background job & queue** — reminder email via Laravel Queue menunjukkan pemahaman arsitektur async.
- **Testing** — unit & feature test dengan Pest PHP membuktikan code quality.

---

## Deskripsi untuk Upwork Portfolio

> Built a multi-tenant SaaS platform for invoicing and billing, enabling businesses to manage clients, create branded invoices, and collect payments via Stripe Checkout. Each tenant operates in an isolated workspace with a custom subdomain, team roles, and their own subscription plan. The backend is powered by Laravel 11 with Sanctum auth, Spatie permissions, Laravel Cashier for SaaS billing, and queue-based email automation. The frontend is built with Next.js 14, TypeScript, and Tailwind CSS. Stripe webhooks automatically update invoice statuses in real time.

**Key technical highlights:** multi-tenancy · Stripe Checkout + Billing · Laravel Queue · PDF generation · REST API · TypeScript · full-stack deployment

---

*Generated for Upwork portfolio planning — InvoiceFlow SaaS*
