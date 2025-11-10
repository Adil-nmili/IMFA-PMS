export type ReservationFormValues = {
  nom: string;
  prenom: string;
  cin: string;
  statut_social: string;
  date_naissance: string;
  idClient : string | number,
  tel: string;
  email: string;
  adresse: string;
  genre:string,
  status: "confirme" | "en_attente" | "paye",
  date_entree:string,
  date_sortie:string,
  enfantNum:number,
  adultsNum:number,
  services: ServiceType[] | null | any,
  chambres : number[]
};

export interface ServiceType {
  id: number;
  type: string;
  description: string;
}
