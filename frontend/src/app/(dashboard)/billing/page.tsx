/* ─── Types ──────────────────────────────────────────────────── */
interface UsageStat {
  label: string;
  used: number;
  limit: number;
  pct: number;
  warn?: boolean;
}

interface BillingRow {
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Failed" | "Refunded";
}

/* ─── Data ───────────────────────────────────────────────────── */
const usageStats: UsageStat[] = [
  { label: "Monthly Invoices", used: 4, limit: 5, pct: 80, warn: true },
  { label: "Clients",          used: 2, limit: 3, pct: 66 },
];

const freeFeatures = [
  { label: "5 Invoices per month",  included: true },
  { label: "Up to 3 Clients",       included: true },
  { label: "Team Members",          included: false },
  { label: "Custom Branding",       included: false },
];

const proFeatures = [
  "Unlimited Invoices",
  "Unlimited Clients",
  "Up to 5 Team Members",
  "Custom Branding & Logos",
];

/* Example billing rows — currently empty for free user */
const billingRows: BillingRow[] = [];

/* ─── Page ───────────────────────────────────────────────────── */
export default function BillingPage() {
  return (
    <div className="p-8 max-w-container-max mx-auto w-full flex flex-col gap-stack-lg">
      {/* Page header */}
      <header>
        <h1 className="text-display-xl text-on-surface">Billing &amp; Subscription</h1>
        <p className="text-body-lg text-on-surface-variant mt-2">
          Manage your current plan, view usage, and access billing history.
        </p>
      </header>

      {/* Top bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Current Plan & Usage */}
        <div className="lg:col-span-1 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                Current Plan
              </p>
              <h3 className="text-headline-lg text-on-surface">Free Plan</h3>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container text-primary">
              Active
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {usageStats.map((stat, i) => (
              <div key={stat.label} className={i > 0 ? "pt-4 border-t border-outline-variant/50" : ""}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-label-md text-on-surface">{stat.label}</span>
                  <span className="text-body-md text-on-surface-variant">
                    {stat.used}/{stat.limit} used
                  </span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full transition-all"
                    style={{ width: `${stat.pct}%` }}
                  />
                </div>
                {stat.warn && (
                  <p className="text-label-sm text-on-surface-variant mt-2">
                    Approaching limit. Upgrade to Pro for unlimited invoices.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-container/10 to-transparent rounded-bl-full pointer-events-none" />

          <h3 className="text-headline-md text-on-surface mb-6">Upgrade your workflow</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free column */}
            <div className="flex flex-col gap-4">
              <div className="pb-4 border-b border-outline-variant/50">
                <h4 className="text-label-md text-on-surface-variant">Free</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-headline-lg text-on-surface">$0</span>
                  <span className="text-body-md text-on-surface-variant">/month</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {freeFeatures.map((f) => (
                  <li key={f.label} className={`flex items-center gap-2 text-body-md ${f.included ? "text-on-surface" : "text-on-surface-variant opacity-50"}`}>
                    <span className={`material-symbols-outlined text-sm leading-none ${f.included ? "text-outline" : "text-outline/40"}`}>
                      {f.included ? "check_circle" : "cancel"}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro column */}
            <div className="flex flex-col gap-4 p-5 bg-surface-container-low rounded-lg border border-primary-fixed relative">
              <span className="absolute -top-3 right-4 bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                Recommended
              </span>
              <div className="pb-4 border-b border-primary-fixed-dim/30">
                <h4 className="text-label-md text-primary">Pro</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-headline-lg text-on-surface">$29</span>
                  <span className="text-body-md text-on-surface-variant">/month</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-body-md text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary text-sm leading-none"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button className="w-full bg-primary hover:bg-primary/90 text-on-primary text-label-md font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                  Upgrade to Pro
                  <span className="material-symbols-outlined text-[16px] leading-none">arrow_forward</span>
                </button>
                <p className="text-center text-label-sm text-outline mt-2 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[12px] leading-none">lock</span>
                  Secure payment via Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-outline-variant">
          <h3 className="text-headline-md text-on-surface">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                {["Date", "Description", "Amount", "Status", "Receipt"].map((h, i) => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${i === 4 ? "text-right" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-body-md divide-y divide-outline-variant/30">
              {billingRows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-outline">
                      <span className="material-symbols-outlined text-4xl mb-3 opacity-50">
                        receipt_long
                      </span>
                      <p className="text-label-md text-on-surface">No billing history yet</p>
                      <p className="text-body-md mt-1">
                        You are currently on the Free plan. Previous invoices will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                billingRows.map((row) => (
                  <tr key={row.date} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-6 py-4 text-on-surface">{row.date}</td>
                    <td className="px-6 py-4 text-on-surface">{row.description}</td>
                    <td className="px-6 py-4 text-on-surface font-mono text-sm">{row.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-container/30 text-on-secondary-container border border-secondary-container/50">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-primary/80 text-label-sm flex items-center justify-end gap-1 ml-auto transition-colors">
                        Download
                        <span className="material-symbols-outlined text-[16px] leading-none">download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
