export interface Facture{
   numeroFacture:string;
   client:string;
   date:string;
   montant:number;
   statut:"Payé" | "Non payé";

}