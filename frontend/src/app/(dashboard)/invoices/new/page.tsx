"use client";

import { useState } from "react";

/* ─── Types ──────────────────────────────────────────────────── */
interface LineItem {
  id: number;
  description: string;
  qty: number;
  price: number;
  taxable: boolean;
}

/* ─── Helpers ────────────────────────────────────────────────── */
const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

let nextId = 3;

/* ─── Page ───────────────────────────────────────────────────── */
export default function NewInvoicePage() {
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "Web Development Consulting", qty: 40,  price: 150,  taxable: true  },
    { id: 2, description: "Server Maintenance",          qty: 1,   price: 500,  taxable: false },
  ]);
  const [discountPct, setDiscountPct] = useState(0);
  const [taxPct,      setTaxPct]      = useState(8.5);

  /* Computed totals */
  const subtotal     = items.reduce((s, i) => s + i.qty * i.price, 0);
  const discountAmt  = subtotal * (discountPct / 100);
  const taxableBase  = items.filter((i) => i.taxable).reduce((s, i) => s + i.qty * i.price, 0);
  const taxAmt       = (taxableBase - taxableBase * (discountPct / 100)) * (taxPct / 100);
  const total        = subtotal - discountAmt + taxAmt;

  function updateItem<K extends keyof LineItem>(id: number, key: K, value: LineItem[K]) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      { id: nextId++, description: "", qty: 1, price: 0, taxable: false },
    ]);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div className="p-8 max-w-container-max mx-auto w-full flex flex-col gap-stack-lg">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-headline-lg text-on-surface">Create New Invoice</h2>
          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm border border-outline-variant">
            Draft
          </span>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-container-low transition-colors">
            Preview PDF
          </button>
          <button className="px-4 py-2 border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-container-low transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-sm leading-none">send</span>
            Send via Email
          </button>
        </div>
      </div>

      {/* Form canvas */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-gutter flex flex-col gap-stack-lg">

        {/* Top grid: Client + Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Client Information */}
          <div className="flex flex-col gap-stack-sm">
            <h3 className="text-headline-md text-on-surface">Client Information</h3>
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-on-surface-variant">Select Client</label>
              <select className="w-full p-2 border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                <option value="" disabled>Choose a client...</option>
                <option value="1">Acme Corp</option>
                <option value="2">Global Industries</option>
                <option value="3">TechStart Inc.</option>
              </select>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="flex flex-col gap-stack-sm">
            <h3 className="text-headline-md text-on-surface">Invoice Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-on-surface-variant">Invoice Number</label>
                <input
                  readOnly
                  type="text"
                  defaultValue="INV-2023-0042"
                  className="w-full p-2 border border-outline-variant rounded-lg font-mono text-sm bg-surface-container-low text-on-surface-variant cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-on-surface-variant">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-label-md text-on-surface-variant">Due Date</label>
                <div className="flex gap-2">
                  <select className="w-1/3 p-2 border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option>Net 15</option>
                    <option selected>Net 30</option>
                    <option>Net 60</option>
                    <option>Custom</option>
                  </select>
                  <input
                    type="date"
                    className="w-2/3 p-2 border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-outline-variant" />

        {/* Line Items */}
        <div className="flex flex-col gap-stack-sm">
          <h3 className="text-headline-md text-on-surface mb-2">Line Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant text-on-surface-variant">
                  <th className="py-2 text-label-sm font-semibold w-1/2">Description</th>
                  <th className="py-2 text-label-sm font-semibold w-1/6">Qty</th>
                  <th className="py-2 text-label-sm font-semibold w-1/6">Price</th>
                  <th className="py-2 text-label-sm font-semibold w-1/12">Tax</th>
                  <th className="py-2 text-label-sm font-semibold text-right w-1/6">Amount</th>
                  <th className="py-2 w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low transition-colors group">
                    {/* Description */}
                    <td className="py-3 pr-2">
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        className="w-full p-2 border border-transparent hover:border-outline-variant focus:border-primary rounded text-body-md bg-transparent focus:bg-surface-container-lowest outline-none transition-all"
                      />
                    </td>
                    {/* Qty */}
                    <td className="py-3 px-2">
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
                        className="w-full p-2 border border-transparent hover:border-outline-variant focus:border-primary rounded text-body-md bg-transparent focus:bg-surface-container-lowest outline-none transition-all"
                      />
                    </td>
                    {/* Price */}
                    <td className="py-3 px-2">
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant font-mono text-sm">$</span>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                          className="w-full p-2 pl-6 border border-transparent hover:border-outline-variant focus:border-primary rounded font-mono text-sm bg-transparent focus:bg-surface-container-lowest outline-none transition-all"
                        />
                      </div>
                    </td>
                    {/* Taxable */}
                    <td className="py-3 px-2">
                      <input
                        type="checkbox"
                        checked={item.taxable}
                        onChange={(e) => updateItem(item.id, "taxable", e.target.checked)}
                        className="rounded border-outline-variant text-primary focus:ring-primary"
                      />
                    </td>
                    {/* Amount */}
                    <td className="py-3 pl-2 text-right font-mono text-sm text-on-surface">
                      ${fmt(item.qty * item.price)}
                    </td>
                    {/* Delete */}
                    <td className="py-3 text-right">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-outline hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[20px] leading-none">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addItem}
            className="mt-2 text-primary text-label-md font-medium flex items-center gap-1 w-max hover:text-primary/70 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">add_circle</span>
            Add Line Item
          </button>
        </div>

        <hr className="border-outline-variant" />

        {/* Summary & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-start">
          {/* Notes */}
          <div className="flex flex-col gap-2">
            <label className="text-label-md text-on-surface-variant">Notes / Terms</label>
            <textarea
              placeholder="Thank you for your business. Payment is due within 30 days."
              className="w-full p-3 border border-outline-variant rounded-lg text-body-md bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[120px] resize-y"
            />
          </div>

          {/* Totals */}
          <div className="bg-surface-container-low p-stack-md rounded-xl border border-outline-variant/50 flex flex-col gap-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="text-body-md">Subtotal</span>
              <span className="font-mono text-sm">${fmt(subtotal)}</span>
            </div>

            {/* Discount */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-body-md text-on-surface-variant">Discount</span>
                <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest overflow-hidden w-24">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={discountPct}
                    onChange={(e) => setDiscountPct(Number(e.target.value))}
                    className="w-full p-1 text-right border-none font-mono text-sm focus:ring-0 bg-transparent outline-none"
                  />
                  <span className="bg-surface-container-high px-2 py-1 text-xs font-bold text-on-surface-variant border-l border-outline-variant">
                    %
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm text-on-surface-variant">-${fmt(discountAmt)}</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-body-md text-on-surface-variant">Tax</span>
                <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest overflow-hidden w-24">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={taxPct}
                    onChange={(e) => setTaxPct(Number(e.target.value))}
                    className="w-full p-1 text-right border-none font-mono text-sm focus:ring-0 bg-transparent outline-none"
                  />
                  <span className="bg-surface-container-high px-2 py-1 text-xs font-bold text-on-surface-variant border-l border-outline-variant">
                    %
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm text-on-surface-variant">${fmt(taxAmt)}</span>
            </div>

            <hr className="border-outline-variant my-1" />

            {/* Total */}
            <div className="flex justify-between items-center text-on-surface">
              <span className="text-headline-md">Total</span>
              <span className="font-mono text-xl font-bold text-primary">${fmt(total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
