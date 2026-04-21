export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  tenant_id: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tenant {
  id: number;
  name: string;
  subdomain: string;
  plan: "free" | "pro";
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  tenant_id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  tenant_id: number;
  name: string;
  price: number;
  unit: string;
  tax_rate: number;
  created_at: string;
  updated_at: string;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export interface Invoice {
  id: number;
  tenant_id: number;
  client_id: number;
  number: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  client?: Client;
  items?: InvoiceItem[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  product_id: number | null;
  description: string;
  qty: number;
  unit_price: number;
  tax_rate: number;
  amount: number;
}

export interface Payment {
  id: number;
  invoice_id: number;
  amount: number;
  method: string;
  stripe_payment_id: string | null;
  paid_at: string;
}
