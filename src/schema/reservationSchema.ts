import { z } from "zod";

export const reservationSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  prenom: z.string().min(2, "Prénom requis"),
  cin: z.string().min(6, "CIN invalide"),
  genre: z.enum(["masculin", "feminin"]),
  statut_social: z.enum(["celibataire", "marie", "divorce", "veuf"]),
  date_naissance: z.string().min(1, "Date de naissance requise"),
  tel: z.string().min(8, "Téléphone invalide"),
  email: z.string().email("Email invalide"),
  adresse: z.string().min(5, "Adresse invalide"),
  date_entree:z.string().min(1,"Date d'entree requise !"),
  date_sortie:z.string().min(1,"Date de sortie requise !"),
  enfantNum:z.int().min(0,"opt !"),
  adultNum:z.int().min(1,"Nombre des adultes est requise !!")
});
