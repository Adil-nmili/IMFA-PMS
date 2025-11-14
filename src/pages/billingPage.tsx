import { columns } from "@/components/billing/columns"
import type { Billing } from "@/components/billing/columns"
import { DataTable } from "@/components/billing/data-table"

async function getData(): Promise<Billing[]> {
  // Fetch data from your API here.
  return [   
  { "numeroFacture": "INV-2025-001", "client": "Ali", "date": "2025-01-03", "montant": 350, "statut": "Payé" },
  { "numeroFacture": "INV-2025-002", "client": "Sara", "date": "2025-01-05", "montant": 1200, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-003", "client": "Imane", "date": "2025-01-09", "montant": 450, "statut": "Payé" },
  { "numeroFacture": "INV-2025-004", "client": "Hicham", "date": "2025-01-12", "montant": 980, "statut": "Payé" },
  { "numeroFacture": "INV-2025-005", "client": "Yassine", "date": "2025-01-15", "montant": 300, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-006", "client": "Nadia", "date": "2025-01-18", "montant": 1600, "statut": "Payé" },
  { "numeroFacture": "INV-2025-007", "client": "Khalid", "date": "2025-01-20", "montant": 700, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-008", "client": "Omar", "date": "2025-01-21", "montant": 1100, "statut": "Payé" },
  { "numeroFacture": "INV-2025-009", "client": "Aya", "date": "2025-01-22", "montant": 260, "statut": "Payé" },
  { "numeroFacture": "INV-2025-010", "client": "Salma", "date": "2025-01-25", "montant": 540, "statut": "Non payé" },

  { "numeroFacture": "INV-2025-011", "client": "Othmane", "date": "2025-02-01", "montant": 980, "statut": "Payé" },
  { "numeroFacture": "INV-2025-012", "client": "Meryem", "date": "2025-02-03", "montant": 2000, "statut": "Payé" },
  { "numeroFacture": "INV-2025-013", "client": "Karim", "date": "2025-02-04", "montant": 400, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-014", "client": "Hanae", "date": "2025-02-06", "montant": 650, "statut": "Payé" },
  { "numeroFacture": "INV-2025-015", "client": "Youssef", "date": "2025-02-10", "montant": 1500, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-016", "client": "Amine", "date": "2025-02-11", "montant": 380, "statut": "Payé" },
  { "numeroFacture": "INV-2025-017", "client": "Samira", "date": "2025-02-12", "montant": 970, "statut": "Payé" },
  { "numeroFacture": "INV-2025-018", "client": "Hajar", "date": "2025-02-14", "montant": 2100, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-019", "client": "Tarik", "date": "2025-02-16", "montant": 720, "statut": "Payé" },
  { "numeroFacture": "INV-2025-020", "client": "Rania", "date": "2025-02-17", "montant": 520, "statut": "Non payé" },

  { "numeroFacture": "INV-2025-021", "client": "Soufiane", "date": "2025-03-01", "montant": 890, "statut": "Payé" },
  { "numeroFacture": "INV-2025-022", "client": "Fatima", "date": "2025-03-02", "montant": 310, "statut": "Payé" },
  { "numeroFacture": "INV-2025-023", "client": "Farah", "date": "2025-03-05", "montant": 1750, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-024", "client": "Hamza", "date": "2025-03-06", "montant": 600, "statut": "Payé" },
  { "numeroFacture": "INV-2025-025", "client": "Jawad", "date": "2025-03-10", "montant": 430, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-026", "client": "Loubna", "date": "2025-03-12", "montant": 1000, "statut": "Payé" },
  { "numeroFacture": "INV-2025-027", "client": "Saad", "date": "2025-03-14", "montant": 950, "statut": "Payé" },
  { "numeroFacture": "INV-2025-028", "client": "Ghita", "date": "2025-03-15", "montant": 1450, "statut": "Non payé" },
  { "numeroFacture": "INV-2025-029", "client": "Reda", "date": "2025-03-17", "montant": 870, "statut": "Payé" },
  { "numeroFacture": "INV-2025-030", "client": "Nabil", "date": "2025-03-18", "montant": 390, "statut": "Non payé" }
]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className=' border border-[#aaa499]  rounded-2xl px-2 h-full pb-1'>
       
      <div className="flex justify-around items-center my-1 gap-1">
          <div className="w-96 py-7 bg-red-800 rounded-lg"></div>
          <div className="w-96 py-7 bg-red-800 rounded-lg"></div>
          <div className="w-96 py-7 bg-red-800 rounded-lg"></div>
      </div>
       <div className="border border-[#aaa499]  rounded-lg flex-1 px-1">
        <DataTable columns={columns} data={data} />
       </div>
   
    </div>
    
  )
}