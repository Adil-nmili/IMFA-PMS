"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { useInvoiceStore } from "@/stores/invoiceStore";
import { 
  Download, 
  Printer, 
  Mail, 
  Copy, 
  CheckCheck, 
  Calendar, 
  User, 
  FileText, 
  CreditCard,
  Building,
  MapPin,
  Phone,
  Globe,
  Loader2,
  Share2,
  Eye,
  EyeOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function InvoiceModal() {
  const { selectedInvoice, modalOpen, closeModal } = useInvoiceStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleDownload = async () => {
    if (!selectedInvoice) return;
    
    setIsGenerating(true);
    
    try {
      // Dynamic import of PDFMake
      const pdfMake = (await import("pdfmake/build/pdfmake")).default;
      const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;
      pdfMake.vfs = pdfFonts;

      // Format date
      const invoiceDate = new Date(selectedInvoice.Date_invoice);
      const formattedDate = format(invoiceDate, 'dd MMMM yyyy', { locale: fr });
      const dueDate = new Date(invoiceDate);
      dueDate.setDate(dueDate.getDate() + 30);
      const formattedDueDate = format(dueDate, 'dd MMMM yyyy', { locale: fr });

      // Professional invoice template
      const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
          // Header
          {
            columns: [
              {
                width: '50%',
                stack: [
                  { text: 'INVOICE', style: 'header' },
                  { text: `#${selectedInvoice.Invoice_number}`, style: 'invoiceNumber' },
                ]
              },
              {
                width: '50%',
                text: [
                  { text: 'Company Name\n', style: 'companyName' },
                  '123 Business Street\n',
                  'Casablanca 20000, Morocco\n',
                  'Phone: +212 522-123456\n',
                  'Email: info@company.com\n',
                  'Website: www.company.ma'
                ],
                alignment: 'right'
              }
            ]
          },
          
          { text: '\n' },
          
          // Company and Client Info
          {
            columns: [
              {
                width: '50%',
                stack: [
                  { text: 'BILL TO:', style: 'sectionHeader' },
                  { text: selectedInvoice.Client, style: 'clientName' },
                  'Client Company Name\n',
                  'Client Address Line 1\n',
                  'Client Address Line 2\n',
                  'client@email.com'
                ]
              },
              {
                width: '50%',
                stack: [
                  { text: 'INVOICE DETAILS:', style: 'sectionHeader' },
                  {
                    columns: [
                      { text: 'Invoice Date:', width: 'auto' },
                      { text: formattedDate, alignment: 'right', bold: true }
                    ]
                  },
                  {
                    columns: [
                      { text: 'Due Date:', width: 'auto' },
                      { text: formattedDueDate, alignment: 'right', bold: true }
                    ]
                  },
                  {
                    columns: [
                      { text: 'Status:', width: 'auto' },
                      { 
                        text: selectedInvoice.Status.toUpperCase(), 
                        alignment: 'right', 
                        bold: true,
                        color: selectedInvoice.Status === 'paid' ? 'green' : 'orange'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          
          { text: '\n\n' },
          
          // Items Table
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                [
                  { text: 'Description', style: 'tableHeader' },
                  { text: 'Quantity', style: 'tableHeader' },
                  { text: 'Unit Price', style: 'tableHeader' },
                  { text: 'Amount', style: 'tableHeader' }
                ],
                [
                  'Professional Services',
                  '1',
                  `${selectedInvoice.Total_amount} DH`,
                  `${selectedInvoice.Total_amount} DH`
                ],
                [
                  { text: 'Service Fee', colSpan: 3, alignment: 'right' },
                  {},
                  {},
                  '150 DH'
                ],
                [
                  { text: 'Subtotal', colSpan: 3, alignment: 'right', bold: true },
                  {},
                  {},
                  { text: `${selectedInvoice.Total_amount} DH`, bold: true }
                ],
                [
                  { text: 'VAT (20%)', colSpan: 3, alignment: 'right' },
                  {},
                  {},
                  `${(selectedInvoice.Total_amount * 0.2).toFixed(2)} DH`
                ],
                [
                  { text: 'TOTAL', colSpan: 3, alignment: 'right', style: 'totalLabel' },
                  {},
                  {},
                  { 
                    text: `${(selectedInvoice.Total_amount * 1.2).toFixed(2)} DH`, 
                    style: 'totalAmount' 
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function(i, node) {
                return 0;
              },
              hLineColor: function(i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              paddingLeft: function(i, node) { return 4; },
              paddingRight: function(i, node) { return 4; },
              paddingTop: function(i, node) { return 2; },
              paddingBottom: function(i, node) { return 2; }
            }
          },
          
          { text: '\n\n' },
          
          // Payment Information
          {
            text: [
              { text: 'PAYMENT INFORMATION\n', style: 'sectionHeader' },
              'Bank: Bank Al-Maghrib\n',
              'Account Name: Company Name\n',
              'IBAN: MA64 1234 5678 9012 3456 7890 123\n',
              'SWIFT/BIC: BAMAMAMC\n'
            ]
          },
          
          { text: '\n' },
          
          // Terms and Conditions
          {
            text: [
              { text: 'TERMS & CONDITIONS\n', style: 'sectionHeader' },
              '1. Payment is due within 30 days of invoice date.\n',
              '2. Late payments are subject to a 1.5% monthly interest fee.\n',
              '3. All amounts are in Moroccan Dirhams (MAD).\n',
              '4. For any questions regarding this invoice, contact our accounting department.\n'
            ]
          },
          
          { text: '\n\n' },
          
          // Footer
          {
            text: [
              { text: 'Thank you for your business!\n\n', style: 'thankYou' },
              { text: 'Company Name', bold: true },
              ' | Phone: +212 522-123456 | Email: accounting@company.ma | Website: www.company.ma'
            ],
            alignment: 'center',
            fontSize: 9,
            color: 'gray'
          }
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            color: '#1e40af'
          },
          invoiceNumber: {
            fontSize: 14,
            color: '#6b7280',
            margin: [0, 5, 0, 0]
          },
          companyName: {
            fontSize: 12,
            bold: true,
            color: '#1f2937'
          },
          sectionHeader: {
            fontSize: 10,
            bold: true,
            color: '#374151',
            margin: [0, 10, 0, 5]
          },
          clientName: {
            fontSize: 11,
            bold: true,
            margin: [0, 0, 0, 5]
          },
          tableHeader: {
            bold: true,
            fontSize: 10,
            color: 'white',
            fillColor: '#1e40af'
          },
          totalLabel: {
            bold: true,
            fontSize: 11
          },
          totalAmount: {
            bold: true,
            fontSize: 12,
            color: '#1e40af'
          },
          thankYou: {
            fontSize: 11,
            italics: true,
            color: '#4b5563'
          }
        }
      };

      pdfMake.createPdf(docDefinition).download(`invoice-${selectedInvoice.Invoice_number}.pdf`);
      toast.success("Invoice PDF downloaded successfully!");
      
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
    toast.success("Preparing for print...");
  };

  const handleSendEmail = async () => {
    if (!selectedInvoice) return;
    
    setIsSending(true);
    // Simulate email sending
    setTimeout(() => {
      setIsSending(false);
      toast.success(`Invoice sent to ${selectedInvoice.Client || 'client'}`);
    }, 1500);
  };

  const handleCopyInvoiceNumber = () => {
    if (!selectedInvoice) return;
    
    navigator.clipboard.writeText(selectedInvoice.Invoice_number);
    setCopied(true);
    toast.success("Invoice number copied to clipboard!");
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkAsPaid = () => {
    toast.success("Invoice marked as paid!");
    // Here you would update the invoice status in your store/API
  };

  if (!selectedInvoice) return null;

  const invoiceDate = new Date(selectedInvoice.Date_invoice);
  const formattedDate = format(invoiceDate, 'PPP', { locale: fr });
  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + 30);
  const formattedDueDate = format(dueDate, 'PPP', { locale: fr });

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Invoice #{selectedInvoice.Invoice_number}
              </DialogTitle>
              <DialogDescription>
                Detailed view and actions for this invoice
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(selectedInvoice.Status)}>
              {selectedInvoice.Status.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">
              <Eye className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="preview">
              <FileText className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="actions">
              <Share2 className="h-4 w-4 mr-2" />
              Actions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Invoice Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">CLIENT INFORMATION</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{selectedInvoice.Client}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Client Company Inc.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">123 Client Street, Casablanca</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">+212 600-000000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">INVOICE DETAILS</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Invoice Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold">#{selectedInvoice.Invoice_number}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={handleCopyInvoiceNumber}
                          >
                            {copied ? <CheckCheck className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="font-medium">{formattedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{formattedDueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="font-medium">Net 30</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Amount Breakdown */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">AMOUNT BREAKDOWN</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-medium">{selectedInvoice.Total_amount} DH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span className="font-medium">150 DH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (20%):</span>
                      <span className="font-medium">{(selectedInvoice.Total_amount * 0.2).toFixed(2)} DH</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>TOTAL AMOUNT</span>
                      <span className="text-blue-600">
                        {(selectedInvoice.Total_amount * 1.2 + 150).toFixed(2)} DH
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-4">PAYMENT INFORMATION</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Bank Transfer</span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div>Bank: Bank Al-Maghrib</div>
                      <div>Account: Company Name SARL</div>
                      <div>IBAN: MA64 1234 5678 9012 3456 7890 123</div>
                      <div>SWIFT: BAMAMAMC</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Online Payment</span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div>PayPal: pay@company.ma</div>
                      <div>Stripe: Available</div>
                      <div>Carte Bancaire: Accepted</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="text-center mb-8">
                    <div className="text-2xl font-bold text-blue-600">INVOICE PREVIEW</div>
                    <div className="text-gray-500 mt-2">
                      This is how your invoice will look when exported
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 rounded-lg shadow-inner border">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <div className="text-2xl font-bold text-gray-800">INVOICE</div>
                        <div className="text-gray-600">#{selectedInvoice.Invoice_number}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">Company Name</div>
                        <div className="text-sm text-gray-600">123 Business Street</div>
                        <div className="text-sm text-gray-600">Casablanca, Morocco</div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-8">
                      <div className="font-bold mb-2">Bill To:</div>
                      <div>{selectedInvoice.Client}</div>
                      <div className="text-gray-600">Client Company Name</div>
                      <div className="text-gray-600">client@email.com</div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="border p-3 text-left">Description</th>
                            <th className="border p-3 text-center">Qty</th>
                            <th className="border p-3 text-right">Price</th>
                            <th className="border p-3 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-3">Professional Services</td>
                            <td className="border p-3 text-center">1</td>
                            <td className="border p-3 text-right">{selectedInvoice.Total_amount} DH</td>
                            <td className="border p-3 text-right">{selectedInvoice.Total_amount} DH</td>
                          </tr>
                          <tr className="font-bold">
                            <td className="border p-3 text-right" colSpan={3}>TOTAL</td>
                            <td className="border p-3 text-right text-blue-600">
                              {(selectedInvoice.Total_amount * 1.2).toFixed(2)} DH
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 justify-start"
                    onClick={handleDownload}
                    disabled={isGenerating}
                  >
                    <Download className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Download PDF</div>
                      <div className="text-xs text-gray-500">High-quality printable invoice</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-auto py-4 justify-start"
                    onClick={handlePrint}
                  >
                    <Printer className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Print Invoice</div>
                      <div className="text-xs text-gray-500">Send to printer</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-auto py-4 justify-start"
                    onClick={handleSendEmail}
                    disabled={isSending}
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Send via Email</div>
                      <div className="text-xs text-gray-500">Email to client</div>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="h-auto py-4 justify-start"
                    onClick={handleMarkAsPaid}
                  >
                    <CheckCheck className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Mark as Paid</div>
                      <div className="text-xs text-gray-500">Update invoice status</div>
                    </div>
                  </Button>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="font-medium">Quick Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm">Duplicate Invoice</Button>
                    <Button variant="secondary" size="sm">Create Credit Note</Button>
                    <Button variant="secondary" size="sm">View Audit Trail</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <div className="text-sm text-gray-500">
            Last updated: {format(new Date(), 'PPpp', { locale: fr })}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}