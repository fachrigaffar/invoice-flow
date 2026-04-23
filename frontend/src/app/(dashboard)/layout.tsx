import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-on-background min-h-screen flex antialiased">
      <Sidebar />
      <div className="ml-[260px] flex flex-col flex-1 min-h-screen">
        <TopBar />
        <main className="pt-16 flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────── */
const navItems = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard", active: true },
  { label: "Invoices",  icon: "description", href: "/invoices" },
  { label: "Clients",   icon: "group",       href: "/clients" },
  { label: "Billing",   icon: "payments",    href: "/billing" },
];

function Sidebar() {
  return (
    <aside className="bg-white text-indigo-900 w-[260px] h-screen border-r border-slate-200 fixed left-0 top-0 flex flex-col py-6 px-4 z-50">
      {/* Workspace switcher */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg select-none">
          I
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-indigo-900 truncate">
            InvoiceFlow
          </h1>
          <p className="text-slate-500 text-xs truncate">Standard Workspace</p>
        </div>
        <span className="material-symbols-outlined text-slate-400 shrink-0">
          expand_more
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) =>
          item.active ? (
            <Link
              key={item.label}
              href={item.href}
              className="bg-slate-100 text-indigo-900 font-semibold border-r-4 border-indigo-900 transition-all flex items-center gap-3 px-3 py-2 rounded-l"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3 px-3 py-2 rounded"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Create invoice CTA */}
      <Link
        href="/invoices/new"
        className="mt-4 mb-6 bg-primary text-on-primary w-full py-2 rounded-lg text-label-md font-medium shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Create New Invoice
      </Link>

      {/* Footer nav */}
      <div className="border-t border-outline-variant pt-4 flex flex-col gap-1">
        {[
          { label: "Settings", icon: "settings", href: "/settings" },
          { label: "Support",  icon: "help",     href: "/support" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-3 px-3 py-2 rounded"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

/* ─── TopBar ─────────────────────────────────────────────────── */
function TopBar() {
  return (
    <header className="bg-white/80 backdrop-blur-md h-16 fixed top-0 right-0 z-40 border-b border-slate-200 shadow-sm flex items-center justify-between px-8 w-[calc(100%-260px)]">
      {/* Search */}
      <div className="flex items-center bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant focus-within:ring-2 focus-within:ring-indigo-500 w-64 transition-all">
        <span className="material-symbols-outlined text-slate-400 mr-2 text-xl leading-none">
          search
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-on-surface"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-indigo-700 transition-colors p-2 rounded-full hover:bg-surface-container-high">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-slate-500 hover:text-indigo-700 transition-colors p-2 rounded-full hover:bg-surface-container-high">
          <span className="material-symbols-outlined">apps</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm cursor-pointer border border-outline-variant select-none">
          A
        </div>
      </div>
    </header>
  );
}
