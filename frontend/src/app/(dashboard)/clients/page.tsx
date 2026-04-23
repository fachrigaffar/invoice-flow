"use client";

import { useState } from "react";

/* ─── Types ──────────────────────────────────────────────────── */
type ClientStatus = "Active" | "Archived";

interface Client {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  email: string;
  totalBilled: string;
  outstanding: string;
  hasOutstanding: boolean;
  status: ClientStatus;
}

/* ─── Data ───────────────────────────────────────────────────── */
const clients: Client[] = [
  {
    id: "CLI-0092",
    name: "Nexus Industries",
    initials: "NI",
    avatarBg: "bg-primary-container",
    avatarColor: "text-on-primary-container",
    email: "billing@nexusind.com",
    totalBilled: "$124,500.00",
    outstanding: "$0.00",
    hasOutstanding: false,
    status: "Active",
  },
  {
    id: "CLI-0104",
    name: "Aria Ventures",
    initials: "AV",
    avatarBg: "bg-surface-container-high",
    avatarColor: "text-primary",
    email: "accounts@ariaventures.io",
    totalBilled: "$45,200.50",
    outstanding: "$8,450.00",
    hasOutstanding: true,
    status: "Active",
  },
  {
    id: "CLI-0045",
    name: "Globex Corp",
    initials: "GC",
    avatarBg: "bg-surface-variant",
    avatarColor: "text-on-surface-variant",
    email: "finance@globex.com",
    totalBilled: "$210,000.00",
    outstanding: "$0.00",
    hasOutstanding: false,
    status: "Archived",
  },
];

const statusBadge: Record<ClientStatus, string> = {
  Active:   "bg-secondary-container/30 text-on-secondary-container border border-secondary-container/50",
  Archived: "bg-surface-variant text-on-surface-variant border border-outline-variant/30",
};

type FilterTab = "All" | "Active" | "Archived";

/* ─── Page ───────────────────────────────────────────────────── */
export default function ClientsPage() {
  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("All");

  const filtered = clients.filter((c) => {
    const matchesTab =
      activeTab === "All" || c.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-8 max-w-container-max mx-auto w-full flex flex-col gap-stack-lg">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-display-xl text-on-surface">Clients</h2>
          <p className="text-body-md text-on-surface-variant mt-1">
            Manage your customer relationships and billing profiles.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-on-primary rounded-lg py-2.5 px-5 text-label-md font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
          <span className="material-symbols-outlined leading-none" style={{ fontSize: 20 }}>
            person_add
          </span>
          Add New Client
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/50">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant leading-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-outline-variant/50 rounded-lg pl-10 pr-4 py-2 text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Tab filter */}
        <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant/30 w-full sm:w-auto">
          {(["All", "Active", "Archived"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-label-md transition-all ${
                activeTab === tab
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/40 bg-surface-container-low/50">
                {[
                  { label: "Client Name",    align: "" },
                  { label: "Contact Email",  align: "" },
                  { label: "Total Billed",   align: "text-right" },
                  { label: "Outstanding",    align: "text-right" },
                  { label: "Status",         align: "" },
                  { label: "Options",        align: "text-center" },
                ].map((h) => (
                  <th
                    key={h.label}
                    className={`py-4 px-6 text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold ${h.align}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-outline">
                      <span className="material-symbols-outlined text-4xl opacity-50">group_off</span>
                      <p className="text-label-md text-on-surface">No clients found</p>
                      <p className="text-body-md">Try adjusting your search or filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((client) => {
                  const archived = client.status === "Archived";
                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-surface-container-low/30 transition-colors group"
                    >
                      {/* Client Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full ${client.avatarBg} ${client.avatarColor} flex items-center justify-center text-label-md font-semibold shrink-0 select-none ${archived ? "opacity-60" : ""}`}
                          >
                            {client.initials}
                          </div>
                          <div>
                            <p className={`text-label-md text-on-surface ${archived ? "text-on-surface-variant" : ""}`}>
                              {client.name}
                            </p>
                            <p className={`text-[13px] mt-0.5 ${archived ? "text-on-surface-variant/70" : "text-on-surface-variant"}`}>
                              ID: {client.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6">
                        <p className={`text-body-md ${archived ? "text-on-surface-variant/70" : "text-on-surface-variant"}`}>
                          {client.email}
                        </p>
                      </td>

                      {/* Total Billed */}
                      <td className="py-4 px-6 text-right">
                        <p className={`font-mono text-sm ${archived ? "text-on-surface-variant/70" : "text-on-surface"}`}>
                          {client.totalBilled}
                        </p>
                      </td>

                      {/* Outstanding */}
                      <td className="py-4 px-6 text-right">
                        <p className={`font-mono text-sm font-semibold ${
                          archived
                            ? "text-on-surface-variant/70"
                            : client.hasOutstanding
                            ? "text-primary"
                            : "text-on-surface"
                        }`}>
                          {client.outstanding}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusBadge[client.status]}`}>
                          {client.status}
                        </span>
                      </td>

                      {/* Options */}
                      <td className="py-4 px-6 text-center">
                        <button className="p-1.5 text-on-surface-variant hover:bg-surface-container rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <span className="material-symbols-outlined leading-none" style={{ fontSize: 20 }}>
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="px-6 py-4 border-t border-outline-variant/40 bg-surface-container-lowest flex items-center justify-between">
          <p className="text-sm text-on-surface-variant">
            Showing 1 to {filtered.length} of 45 clients
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1 rounded text-on-surface-variant hover:bg-surface-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined leading-none">chevron_left</span>
            </button>
            <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined leading-none">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
