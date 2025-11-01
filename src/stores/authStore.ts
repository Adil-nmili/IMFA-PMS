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

// Load existing token from sessionStorage on app load
const storedToken = sessionStorage.getItem("access_token");
const storedUser = sessionStorage.getItem("user");

const useAppState = create<AppState>((set) => ({
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,

  setUser: (user) => {
    set({ user });
    if (user) {
      sessionStorage.setItem("user", user);
    } else {
      sessionStorage.removeItem("user");
    }
  },

  setToken: (token) => {
    set({ token });
    if (token) {
      sessionStorage.setItem("access_token", token);
    } else {
      sessionStorage.removeItem("access_token");
    }
  },
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    // login: (user, token) => set({ user, token, isAuthenticated: true }),
    // logout: () => {set({ user: null, token: null, isAuthenticated: false });localStorage?.removeItem("access_token")},


  login: (user, token) => {
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("access_token", token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
    reservation:{},
    setReservation: (data) =>
    set((state) => ({
        reservation: { ...(state.reservation || {}), ...data },
    })),


    clearReservation:()=>set({reservation:null}),


}));

export default useAppState;
