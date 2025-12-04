import { create } from "zustand";
import type { Invoice } from "@/types/invoice";
import { supabase } from "@/lib/supabaseClient";

interface InvoiceStore {
  invoices: Invoice[];
  loading: boolean;

  totalPaid: number;
  totalPending: number;
  totalPaidThisMonth: number;
  totalThisMonth: number;
  totalByMonth: { [key: string]: number };

  // modal state
  selectedInvoice: Invoice | null;
  modalOpen: boolean;
  openModal: (invoice: Invoice) => void;
  closeModal: () => void;

  fetchInvoices: () => Promise<void>;
}


export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  loading: false,
  totalPaid: 0,
  totalPending: 0,
  totalPaidThisMonth: 0,
  totalThisMonth: 0,
  totalByMonth: {},

  selectedInvoice: null,
  modalOpen: false,
  openModal: (invoice) => set({ selectedInvoice: invoice, modalOpen: true }),
  closeModal: () => set({ selectedInvoice: null, modalOpen: false }),

  fetchInvoices: async () => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("invoices")
      .select(`
        invoice_number,
        date_invoice,
        status,
        total_amount,
        reservations (
          clients ( nom )
        )
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      set({ loading: false });
      return;
    }

    const invoicesMapped: Invoice[] = data.map((inv: any) => ({
      Invoice_number: inv.invoice_number,
      Client: inv.reservations?.clients?.nom ?? "Unknown",
      Date_invoice: inv.date_invoice,
      Total_amount: inv.total_amount,
      Status: inv.status,
    }));

    let totalPaidThisMonth = 0;
    let totalPendingThisMonth = 0;
    let totalThisMonth = 0;
    const totalByMonth: { [key: string]: number } = {};
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    invoicesMapped.forEach((inv) => {
      const invoiceDate = new Date(inv.Date_invoice);
      const month = invoiceDate.getUTCMonth();
      const year = invoiceDate.getUTCFullYear();
      const monthKey = invoiceDate.toLocaleString("fr-FR", { month: "long", year: "numeric" });

      totalByMonth[monthKey] = (totalByMonth[monthKey] || 0) + inv.Total_amount;

      const Status = inv.Status?.trim();
      if (month === currentMonth && year === currentYear) {
        if (Status === "Payé") totalPaidThisMonth += inv.Total_amount;
        if (Status === "Non Payé") totalPendingThisMonth += inv.Total_amount;
        totalThisMonth += inv.Total_amount;
      }
    });

    set({
      invoices: invoicesMapped,
      totalPaid: totalPaidThisMonth,
      totalPending: totalPendingThisMonth,
      totalThisMonth,
      totalByMonth,
      loading: false,
    });
  },
}));

