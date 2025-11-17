export interface Room{
   id:number;
   numRoom:number;
   type:string;
   status:string;
   price:number;
   capacity:number;
   surface: number;
   image:string;
   bathrooms: number;
   amenities?: string[]; 

}