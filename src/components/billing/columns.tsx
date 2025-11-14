"use client"

import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Billing = {
  numeroFacture: string
  client:string
  date:string
  montant: number
  statut: "Payé" | "Non payé"
  
}

export const columns: ColumnDef<Billing>[] = [
    {
    accessorKey: "numeroFacture",
    header: "numeroFacture",
  },
  {
    accessorKey: "client",
    header: "client",
  },
  {
    accessorKey: "date",
    header: "date",
  },
  {
    accessorKey: "statut",
    header: "statut",
  },
  {
    
  accessorKey: "montant",
  header: () => <div className="text-right">Montant</div>,
  cell: ({ row }) => {
    const montant = parseFloat(row.getValue("montant"))
    const formatted = new Intl.NumberFormat("fr-MA", {
      minimumFractionDigits: 2,
    }).format(montant)

    return <div className="text-right font-medium">{formatted} DH</div>
  },
}

  
]