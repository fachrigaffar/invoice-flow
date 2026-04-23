import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col antialiased">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200 ease-in-out text-sm tracking-tight">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-16">
        <div className="text-xl font-extrabold tracking-tighter text-indigo-900">
          InvoiceFlow
        </div>

        <nav className="hidden md:flex gap-6 items-center">
          {[
            { label: "Features", href: "#features" },
            { label: "Solutions", href: "#solutions" },
            { label: "Pricing", href: "#pricing" },
            { label: "Testimonials", href: "#testimonials" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-slate-600 hover:text-indigo-900 hover:bg-slate-50 rounded-md transition-all px-3 py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-slate-600 hover:text-indigo-900 hover:bg-slate-50 rounded-md transition-all px-4 py-2 font-medium hidden sm:block"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-primary text-on-primary hover:bg-primary/90 px-5 py-2 rounded-lg font-medium transition-colors shadow-sm active:scale-95 duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface-container-low -z-10" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-stack-lg z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant text-primary font-medium text-label-md w-fit border border-outline-variant/30">
              <span className="material-symbols-outlined text-base leading-none">
                new_releases
              </span>
              <span>Now with seamless Stripe Integration</span>
            </div>

            <h1 className="text-display-xl lg:text-[48px] lg:leading-[56px] text-on-background text-balance">
              Invoicing made professional for modern teams
            </h1>

            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Manage multiple client workspaces, automate payments through
              Stripe, and generate branded PDF invoices that reflect your
              professionalism. Built for high-volume freelancers and growing
              agencies.
            </p>

            <div className="flex flex-col sm:flex-row gap-stack-md pt-stack-sm">
              <a
                href="#signup"
                className="inline-flex justify-center items-center px-6 py-3 bg-primary text-on-primary rounded-lg text-label-md font-medium shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                Get Started for Free
              </a>
              <a
                href="#demo"
                className="inline-flex justify-center items-center px-6 py-3 bg-surface text-primary border border-outline-variant rounded-lg text-label-md font-medium hover:bg-surface-variant transition-all"
              >
                View Demo
              </a>
            </div>

            <div className="flex items-center gap-stack-sm mt-stack-md text-on-surface-variant">
              <span className="material-symbols-outlined text-xl text-secondary leading-none">
                check_circle
              </span>
              <span className="text-body-md">No credit card required</span>
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="relative lg:ml-12 mt-12 lg:mt-0 z-10">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-surface-variant bg-surface">
              {/* Browser chrome */}
              <div className="h-8 bg-surface-container border-b border-surface-variant flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-tertiary-fixed-dim" />
                <div className="w-3 h-3 rounded-full bg-secondary-fixed-dim" />
              </div>

              {/* Dashboard content */}
              <div className="w-full bg-surface-container-low p-6 space-y-4 min-h-[280px]">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Revenue", value: "$24,500" },
                    { label: "Outstanding", value: "$6,200" },
                    { label: "Paid This Month", value: "$18,300" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-surface rounded-lg p-3 border border-outline-variant/30"
                    >
                      <p className="text-label-sm text-on-surface-variant">
                        {stat.label}
                      </p>
                      <p className="text-headline-md text-on-background mt-1">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-surface rounded-lg border border-outline-variant/30 overflow-hidden">
                  {[
                    {
                      id: "INV-0042",
                      client: "Acme Corp",
                      amount: "$3,200",
                      status: "Paid",
                      badge:
                        "bg-secondary-container text-on-secondary-container",
                    },
                    {
                      id: "INV-0041",
                      client: "Bright Studio",
                      amount: "$1,800",
                      status: "Sent",
                      badge: "bg-surface-container text-on-surface-variant",
                    },
                    {
                      id: "INV-0040",
                      client: "Nova Agency",
                      amount: "$5,500",
                      status: "Overdue",
                      badge: "bg-error-container text-on-error-container",
                    },
                  ].map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between px-4 py-2.5 border-b border-outline-variant/20 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-label-sm font-medium text-on-surface-variant">
                          {row.id}
                        </span>
                        <span className="text-body-md text-on-background">
                          {row.client}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-label-md font-semibold text-on-background">
                          {row.amount}
                        </span>
                        <span
                          className={`text-label-sm px-2 py-0.5 rounded-full ${row.badge}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-lg shadow-lg border border-outline-variant/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant">
                  Payment Received
                </p>
                <p className="text-headline-md text-on-background">$1,250.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features ────────────────────────────────────────────────── */
function FeaturesSection() {
  return (
    <section className="py-24 bg-surface" id="features">
      <div className="max-w-container-max mx-auto px-margin-page">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-stack-sm">
          <h2 className="text-headline-lg text-primary">
            Everything you need to bill professionally
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Designed to reduce cognitive load and streamline your financial
            operations across multiple clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          {/* Feature 1 — Multi-tenant */}
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[120px] text-primary select-none">
                domain
              </span>
            </div>
            <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">workspaces</span>
            </div>
            <h3 className="text-headline-md text-on-background mb-3 relative z-10">
              Multi-tenant Workspaces
            </h3>
            <p className="text-body-md text-on-surface-variant max-w-md relative z-10">
              Maintain a neutral core identity while assigning secondary
              workspace accents. Seamlessly switch between different client
              billing environments without mixing up data or branding.
            </p>
          </div>

          {/* Feature 2 — Stripe */}
          <div className="col-span-1 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-12 h-12 bg-surface-tint text-on-primary rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <h3 className="text-headline-md text-on-background mb-3">
              Automated Stripe Payments
            </h3>
            <p className="text-body-md text-on-surface-variant flex-grow">
              Connect your Stripe account to enable one-click payments directly
              from your invoices.
            </p>
          </div>

          {/* Feature 3 — PDF */}
          <div className="col-span-1 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </div>
            <h3 className="text-headline-md text-on-background mb-3">
              Branded PDF Invoices
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Generate pristine, professional PDFs that mimic high-end physical
              documents. Elevate your brand perception instantly.
            </p>
          </div>

          {/* Feature 4 — Analytics */}
          <div className="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-6">
                <span className="material-symbols-outlined">bar_chart</span>
              </div>
              <h3 className="text-headline-md text-on-background mb-3">
                Clear Financial Insights
              </h3>
              <p className="text-body-md text-on-surface-variant">
                Minimalist data tables and status chips (Paid vs Pending) ensure
                complex billing information always feels manageable.
              </p>
            </div>
            {/* Abstract chart */}
            <div className="w-full md:w-1/2 h-32 bg-surface-container rounded-lg border border-outline-variant/30 flex items-end px-4 gap-2 pb-4">
              {[40, 60, 90, 50, 70].map((h, i) => (
                <div
                  key={i}
                  className={`w-full rounded-t-sm ${i === 2 ? "bg-primary relative" : "bg-primary-fixed"}`}
                  style={{ height: `${h}%` }}
                >
                  {i === 2 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-primary font-bold">
                      UP
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────────────── */
function PricingSection() {
  const freePlan = [
    "Up to 5 invoices/month",
    "1 Workspace",
    "Standard PDF templates",
  ];

  const proPlan = [
    "Unlimited invoices",
    "Unlimited team members",
    "Unlimited Workspaces",
    "Stripe Integration",
    "Custom Branded PDFs",
  ];

  return (
    <section className="py-24 bg-surface-container-low" id="pricing">
      <div className="max-w-container-max mx-auto px-margin-page">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-headline-lg text-on-background mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Start for free, upgrade when your team grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <div className="bg-surface rounded-xl p-8 border border-outline-variant/50 shadow-sm flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-headline-md text-on-background">Free</h3>
              <div className="mt-4 flex items-baseline text-on-background">
                <span className="text-display-xl font-bold">$0</span>
                <span className="ml-1 text-body-lg text-on-surface-variant">
                  /mo
                </span>
              </div>
              <p className="mt-2 text-body-md text-on-surface-variant">
                Perfect for solo freelancers getting started.
              </p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {freePlan.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl leading-none">
                    check
                  </span>
                  <span className="text-body-md text-on-background">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#signup"
              className="w-full block text-center px-6 py-3 bg-surface-container text-primary border border-primary/20 rounded-lg text-label-md font-medium hover:bg-surface-variant transition-colors"
            >
              Start for Free
            </a>
          </div>

          {/* Pro */}
          <div className="bg-primary text-on-primary rounded-xl p-8 shadow-lg relative flex flex-col h-full transform md:-translate-y-2">
            <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-bl-lg rounded-tr-xl text-label-sm font-bold">
              RECOMMENDED
            </div>
            <div className="mb-8">
              <h3 className="text-headline-md">Pro</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-display-xl font-bold">$29</span>
                <span className="ml-1 text-body-lg text-primary-fixed-dim">
                  /mo
                </span>
              </div>
              <p className="mt-2 text-body-md text-primary-fixed">
                For growing teams and agencies.
              </p>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              {proPlan.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-container text-xl leading-none">
                    check
                  </span>
                  <span className="text-body-md">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#signup"
              className="w-full block text-center px-6 py-3 bg-on-primary text-primary rounded-lg text-label-md font-medium hover:bg-surface transition-colors shadow-sm"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "The multi-tenant feature is a lifesaver. I manage billing for 3 different agency brands, and InvoiceFlow keeps everything perfectly siloed and professional.",
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    stars: 5,
    initials: "SJ",
  },
  {
    quote:
      "Automated Stripe payments reduced our late invoices by 40% in the first month. The interface is clean, fast, and exactly what a modern team needs.",
    name: "Marcus Thompson",
    role: "Digital Agency Owner",
    stars: 5,
    initials: "MT",
  },
  {
    quote:
      "The PDF exports look like they came from a high-end law firm. It elevates my entire brand presentation to clients instantly.",
    name: "Elena Rodriguez",
    role: "Consultant",
    stars: 4,
    initials: "ER",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface" id="testimonials">
      <div className="max-w-container-max mx-auto px-margin-page">
        <h2 className="text-headline-lg text-center text-on-background mb-16">
          Trusted by professionals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/40 shadow-sm ${i === 2 ? "hidden lg:block" : ""}`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    className="material-symbols-outlined text-[18px] leading-none"
                    style={{
                      fontVariationSettings: `'FILL' ${j < t.stars ? 1 : 0}`,
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-body-md text-on-surface-variant mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-md font-bold shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-label-md text-on-background">{t.name}</h4>
                  <p className="text-label-sm text-outline">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent)]" />
      <div className="max-w-container-max mx-auto px-margin-page relative z-10 text-center flex flex-col items-center">
        <h2 className="text-display-xl mb-6">
          Ready to streamline your billing?
        </h2>
        <p className="text-body-lg text-primary-fixed mb-10 max-w-xl">
          Join thousands of professionals who have upgraded their invoicing
          workflow. Setup takes less than 2 minutes.
        </p>
        <a
          href="#signup"
          className="inline-flex justify-center items-center px-8 py-4 bg-on-primary text-primary rounded-lg text-headline-md shadow-lg hover:bg-surface hover:scale-[1.02] transition-all active:scale-95"
        >
          Create Your Free Account
        </a>
        <p className="mt-6 text-label-sm text-primary-fixed-dim">
          No credit card required to start.
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  const links = [
    "Privacy Policy",
    "Terms of Service",
    "Security",
    "Status",
    "Contact",
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 text-sm leading-relaxed">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-indigo-900">InvoiceFlow</span>
          <span className="text-slate-500 text-xs">
            © 2024 InvoiceFlow Inc. Professional billing for modern enterprises.
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-slate-500 hover:text-indigo-700 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
