"use client";

import { useEffect } from "react";
import { BillingTable } from "@/components/billing/table/billingTable";
import { useInvoiceStore } from "@/stores/invoiceStore";
import BillingCard from "@/components/billing/billingCard";
import { getColumns } from "@/components/billing/table/columns";
import { InvoiceModal } from "@/components/billing/table/invoiceModal";

export default function BillingPage() {
  const { invoices, fetchInvoices, loading } = useInvoiceStore();
  const columns = getColumns(); 
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading invoices...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 border rounded-lg p-3">
      <BillingCard />
      {/* Table */}
      <BillingTable columns={columns} data={invoices} />

      {/* Modal centralized */}
      <InvoiceModal />
    </div>
  );
}
