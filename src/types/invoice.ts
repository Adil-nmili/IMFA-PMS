export interface Invoice{
   Invoice_number:string;
   Date_invoice:number;
   Total_amount:number;
   Status:"Payé" | "Non Payé";
   Client:string

}