import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import { create } from "zustand";

interface AppState {
    user: string | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: string | null) => void;
    setToken: (token: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    login: (user: string, token: string) => void;
    logout: () => void;
    reservation:any | null;
    setReservation:(reservation:ReservationFormValues )=>void;
    clearReservation : ()=>void;
}
const useAppState = create<AppState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),


    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    login: (user, token) => set({ user, token, isAuthenticated: true }),
    logout: () => {set({ user: null, token: null, isAuthenticated: false });localStorage?.removeItem("access_token")},


    reservation:{},
    setReservation: (data) =>
    set((state) => ({
        reservation: { ...(state.reservation || {}), ...data },
    })),


    clearReservation:()=>set({reservation:null}),


}));

export default useAppState