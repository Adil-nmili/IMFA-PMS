"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useInvoiceStore } from "@/stores/invoiceStore";

export function InvoiceModal() {
  const { selectedInvoice, modalOpen, closeModal } = useInvoiceStore();

  const handleDownload = async () => {
    if (!selectedInvoice) return;
    // console.log("selectedInvoice:", selectedInvoice);

    // dynamic import باش PDFMake و Fonts يشتغلو فقط ملي نحتاجو
    const pdfMake = (await import("pdfmake/build/pdfmake")).default;
    const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

   pdfMake.vfs = pdfFonts;

    const docDefinition = {
      content: [
        { text: "Invoice Details", style: "header" },
        `Client: ${selectedInvoice.Client}`,
        `Amount: ${selectedInvoice.Total_amount} DH`,
        `Date: ${selectedInvoice.Date_invoice}`,
        `Status: ${selectedInvoice.Status}`,
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
      },
    };
       try {
  pdfMake.createPdf(docDefinition).download(`invoice-${selectedInvoice.Invoice_number}.pdf`);
  console.log("PDF download triggered!");
} catch (err) {
  console.error("PDF download error:", err);
}

  };

  return (
    <Dialog open={modalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>Details for the selected invoice.</DialogDescription>
        </DialogHeader>

        {selectedInvoice && (
          <div className="flex flex-col gap-2">
            <p><strong>Client:</strong> {selectedInvoice.Client}</p>
            <p><strong>Date:</strong> {selectedInvoice.Date_invoice}</p>
            <p><strong>Amount:</strong> {selectedInvoice.Total_amount} DH</p>
            <p><strong>Status:</strong> {selectedInvoice.Status}</p>

            <div className="flex justify-end items-end gap-2 mt-4">
              <Button className="w-20 font-normal" variant="ghost" onClick={closeModal}>
                Annuler
              </Button>
              <Button className="w-32" onClick={handleDownload}>
                Télécharger PDF
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
