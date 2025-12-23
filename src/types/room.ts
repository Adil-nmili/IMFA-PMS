export interface Room{
   id:number;
   numRoom:number;
   type:string;
   status:string;
   pricePerNight:number;   
   capacity:number;
   surface: number;
   image:string;
   bathrooms: number;
   amenities?: string[]; 

}