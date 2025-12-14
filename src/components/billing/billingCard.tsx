import React from 'react';
import { useInvoiceStore } from "@/stores/invoiceStore";

const BillingCard = () => {
    const { totalPaid, totalPending, totalThisMonth } = useInvoiceStore();
    
    return (
          <div className="flex justify-around items-center  gap-1">
        <div className="w-96 py-5 px-2 border-2 rounded-lg flex justify-between items-center">
          <h3 className="text-sm font-semibold text-black pl-2">Total facturé (mois)</h3>
          <p>{totalThisMonth}</p>
        </div>
        <div className="w-96 py-5 px-2 border-2 rounded-lg  flex justify-between items-center">
          <h3 className="text-sm font-semibold text-black pl-2">Paiements reçus</h3>
          <p>{totalPaid}</p>
        </div>
        <div className="w-96 py-5 px-2 border-2 rounded-lg  flex justify-between items-center">
          <h3 className="text-sm font-semibold text-black pl-2">En attente</h3>
          <p>{totalPending}</p>
        </div>
      </div>
    );
};

export default BillingCard;