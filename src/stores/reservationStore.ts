import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import { create } from "zustand";

interface ReservationStore {
  reservation: ReservationFormValues;
  setReservation: (data: Partial<ReservationFormValues>) => void;
  clearReservation: () => void;
}

const useReservationStore = create<ReservationStore>((set) => ({
  reservation: {
      nom: "",
      prenom: "",
      cin: "",
      idClient : '',
      statut_social: "",
      date_naissance: "",
      tel: "",
      email: "",
      adresse: "",
      genre: "",
      date_entree: "",
      date_sortie: "",
      enfantNum: 0,
      adultsNum: 0,
      services: undefined,
      chambres:[]
  },

  setReservation: (data: any) =>
    set((state: { reservation: any; }) => ({
      reservation: { ...(state.reservation || {}), ...data },
    })),

  clearReservation: () => set({ reservation: {
      nom: "",
      prenom: "",
      idClient : '',
      cin: "",
      statut_social: "",
      date_naissance: "",
      tel: "",
      email: "",
      adresse: "",
      genre: "",
      date_entree: "",
      date_sortie: "",
      enfantNum: 0,
      adultsNum: 0,
      services: undefined,
      chambres:[]
  } }),
}));

export default useReservationStore;
