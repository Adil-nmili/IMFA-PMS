export type ReservationFormValues = {
  nom: string;
  prenom: string;
  cin: string;
  statut_social: string;
  date_naissance: string;
  tel: string;
  email: string;
  adresse: string;
  genre:string,
  date_entree:string,
  date_sortie:string,
  enfantNum:number,
  adultsNum:number,
  services: any | null
};