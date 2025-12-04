import type { Invoice } from "@/types/invoice";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useInvoiceStore } from "@/stores/invoiceStore";

// src/components/billing/table/columns.tsx
export const getColumns = (): ColumnDef<Invoice>[] => {
  const { openModal } = useInvoiceStore.getState();
  return [
    {
      accessorKey: "Invoice_number",
      header: "N° Facture",
    },
    {
      accessorKey: "Client",
      header: "Client",
    },
    {
      accessorKey: "Date_invoice",
      header: "Date Facture",
      cell: ({ row }) => {
        const date = new Date(row.original.Date_invoice);
        return date.toLocaleDateString("fr-MA");
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        
        const cellDate = new Date(row.getValue(columnId));
        
        if (filterValue.from && filterValue.to) {
          return cellDate >= filterValue.from && cellDate <= filterValue.to;
        }
        
        if (filterValue.from) {
          return cellDate >= filterValue.from;
        }
        
        return true;
      },
    },
    {
      accessorKey: "Status",
      header: "Statut",
      cell: ({ row }) => row.original.Status,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue === "") return true;
        const cellValue = row.getValue(columnId) as string;
        return cellValue === filterValue;
      },
    },
    {
      accessorKey: "Total_amount",
      header: () => <div className="text-right">Montant Total</div>,
      cell: ({ row }) => {
        const Total_amount = parseFloat(row.getValue("Total_amount"));
        const formatted = new Intl.NumberFormat("fr-MA", {
          minimumFractionDigits: 2,
        }).format(Total_amount);

        return <div className="text-right font-medium">{formatted} DH</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button variant="outline" size="sm" onClick={() => openModal(row.original)}>
          Voir
        </Button>
      ),
    },
  ];
};