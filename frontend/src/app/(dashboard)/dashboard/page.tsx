import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────── */
type InvoiceStatus = "Sent" | "Paid" | "Overdue" | "Draft";

interface Invoice {
  id: string;
  client: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

interface Activity {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

/* ─── Data ───────────────────────────────────────────────────── */
const metrics = [
  {
    label: "Total Revenue",
    value: "$12,450.00",
    sub: "+14% from last month",
    subIcon: "trending_up",
    subColor: "text-secondary",
    icon: "account_balance_wallet",
    accent: "bg-primary/5",
  },
  {
    label: "Outstanding",
    value: "$3,200.00",
    valueColor: "text-error",
    sub: "4 invoices awaiting payment",
    subColor: "text-on-surface-variant",
    icon: "pending_actions",
    accent: "bg-error/5",
  },
  {
    label: "Paid",
    value: "$9,250.00",
    valueColor: "text-secondary",
    sub: "12 invoices completed",
    subColor: "text-on-surface-variant",
    icon: "check_circle",
    accent: "bg-secondary/5",
  },
];

const chartBars = [
  { height: "40%", opacity: "bg-primary/20", label: "$4k" },
  { height: "30%", opacity: "bg-primary/20", label: "$3k" },
  { height: "50%", opacity: "bg-primary/30", label: "$5k" },
  { height: "65%", opacity: "bg-primary/40", label: "$6.5k" },
  { height: "45%", opacity: "bg-primary/50", label: "$4.5k" },
  { height: "80%", opacity: "bg-primary/60", label: "$8k" },
  { height: "95%", opacity: "bg-primary",    label: "$9.5k", highlight: true },
];

const activities: Activity[] = [
  {
    icon: "mail",
    iconBg: "bg-surface-container-high",
    iconColor: "text-primary",
    title: "Invoice #1042 Sent",
    description: "To Design Studio LLC",
    time: "2 hours ago",
  },
  {
    icon: "payments",
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
    title: "Payment Received",
    description: "$1,200.00 from Globex Inc.",
    time: "5 hours ago",
  },
  {
    icon: "warning",
    iconBg: "bg-error-container",
    iconColor: "text-on-error-container",
    title: "Invoice Overdue",
    description: "#1038 for TechCorp",
    time: "1 day ago",
  },
];

const invoices: Invoice[] = [
  { id: "INV-1042", client: "Design Studio LLC", date: "Oct 24, 2023", amount: "$850.00",    status: "Sent" },
  { id: "INV-1041", client: "Globex Inc.",        date: "Oct 22, 2023", amount: "$1,200.00",  status: "Paid" },
  { id: "INV-1040", client: "Acme Corp",          date: "Oct 18, 2023", amount: "$3,450.00",  status: "Paid" },
  { id: "INV-1038", client: "TechCorp Systems",   date: "Sep 30, 2023", amount: "$2,100.00",  status: "Overdue" },
];

const statusBadge: Record<InvoiceStatus, string> = {
  Sent:    "bg-surface-container-highest text-on-surface",
  Paid:    "bg-secondary-container/30 text-on-secondary-container border border-secondary-container/50",
  Overdue: "bg-error-container text-on-error-container",
  Draft:   "bg-surface-container text-on-surface-variant",
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="p-8 max-w-container-max mx-auto w-full flex flex-col gap-stack-lg">
      {/* Page header */}
      <header>
        <h2 className="text-headline-lg text-on-surface">Acme Corp Dashboard</h2>
        <p className="text-body-md text-on-surface-variant mt-1">
          Here is a summary of your financial activity.
        </p>
      </header>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-surface-container-lowest rounded-xl p-gutter border border-outline-variant shadow-sm flex flex-col gap-stack-sm relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${m.accent} rounded-bl-full -z-10`} />
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <span className="material-symbols-outlined text-xl leading-none">
                {m.icon}
              </span>
              <h3 className="text-label-md">{m.label}</h3>
            </div>
            <div className={`text-display-xl font-bold ${m.valueColor ?? "text-on-surface"}`}>
              {m.value}
            </div>
            <div className={`text-sm flex items-center gap-1 mt-auto pt-2 ${m.subColor}`}>
              {m.subIcon && (
                <span className="material-symbols-outlined text-base leading-none">
                  {m.subIcon}
                </span>
              )}
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Quick Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Bar chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col">
          <div className="p-gutter border-b border-outline-variant flex items-center justify-between">
            <h3 className="text-headline-md text-on-surface">Monthly Revenue Trends</h3>
            <button className="p-2 rounded hover:bg-surface-container-low text-on-surface-variant transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="p-gutter flex-1 min-h-[300px] flex items-end relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="w-full h-full flex items-end gap-2 px-4 z-10">
              {chartBars.map((bar, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm ${bar.opacity} relative group cursor-pointer hover:brightness-110 transition-all ${bar.highlight ? "shadow-[0_-4px_24px_rgba(26,20,107,0.3)]" : ""}`}
                  style={{ height: bar.height }}
                >
                  <div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs px-2 py-1 rounded whitespace-nowrap ${bar.highlight ? "opacity-100 font-bold" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                  >
                    {bar.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Activity */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col">
          <div className="p-gutter border-b border-outline-variant">
            <h3 className="text-headline-md text-on-surface">Quick Activity</h3>
          </div>
          <div className="p-gutter flex flex-col gap-stack-md">
            {activities.map((a) => (
              <div key={a.title} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${a.iconBg} ${a.iconColor} flex items-center justify-center mt-1 shrink-0`}
                >
                  <span className="material-symbols-outlined text-base leading-none">
                    {a.icon}
                  </span>
                </div>
                <div>
                  <p className="text-label-md text-on-surface">{a.title}</p>
                  <p className="text-sm text-on-surface-variant">{a.description}</p>
                  <p className="text-xs text-outline mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto p-4 border-t border-outline-variant text-center">
            <Link
              href="/activity"
              className="text-label-md text-primary hover:text-primary/80 transition-colors"
            >
              View All Activity
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Invoices table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden mb-8">
        <div className="p-gutter border-b border-outline-variant flex items-center justify-between bg-surface-bright">
          <h3 className="text-headline-md text-on-surface">Recent Invoices</h3>
          <Link
            href="/invoices"
            className="text-label-md text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            View All
            <span className="material-symbols-outlined text-[18px] leading-none">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                {["Invoice #", "Client", "Date", "Amount", "Status", ""].map((h) => (
                  <th
                    key={h}
                    className="py-3 px-gutter text-label-sm text-on-surface-variant font-semibold"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-body-md text-on-surface">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-outline-variant/50 last:border-0 hover:bg-surface-container-low/50 transition-colors"
                >
                  <td className="py-4 px-gutter font-mono text-sm">{inv.id}</td>
                  <td className="py-4 px-gutter text-label-md">{inv.client}</td>
                  <td className="py-4 px-gutter text-on-surface-variant">{inv.date}</td>
                  <td className="py-4 px-gutter text-label-md text-on-surface">{inv.amount}</td>
                  <td className="py-4 px-gutter">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge[inv.status]}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-gutter text-right">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl leading-none">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
