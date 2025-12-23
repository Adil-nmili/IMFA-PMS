import type { ReservationFormValues } from "@/types/ReservationFormValuesType";
import { create} from "zustand";


export interface StaffProfile {
  id: string;
  email: string;
  nomEmp: string;
  code_pin?: string;
  rfid?: string;
  role: string;
}

interface AppState {
  user: StaffProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: StaffProfile | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (user: StaffProfile, token: string) => void;
  logout: () => void;
  reservation: ReservationFormValues | null;
  setReservation: (reservation: ReservationFormValues) => void;
  clearReservation: () => void;
  hydrate: boolean;
}

// // Load existing token from sessionStorage on app load
// // const storedToken = sessionStorage.getItem("access_token");
// // const storedUserJson = sessionStorage.getItem("user");
// // const storedUser = storedUserJson ? JSON.parse(storedUserJson) : null;

// Final, clean version
const useAppState = create<AppState>((set) => {
  // Load user safely
  let safeStoredUser: StaffProfile | null = null;
  try {
    const raw = sessionStorage.getItem("user");
    if (raw && raw !== "[object Object]") {
      safeStoredUser = JSON.parse(raw);
    } else if (raw) {
      sessionStorage.removeItem("user");
    }
  } catch (e) {
    console.warn("Invalid user data, clearing");
    sessionStorage.removeItem("user");
  }

  const storedToken = sessionStorage.getItem("access_token");

  return {
    user: safeStoredUser,
    token: storedToken,
    isAuthenticated: !!storedToken,
    hydrate: true, // ✅ We're ready immediately!

    setUser: (user) => {
      set({ user });
      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
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

    login: (user, token) => {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("access_token", token);
      set({ user, token, isAuthenticated: true });
    },

    logout: () => {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
      set({ user: null, token: null, isAuthenticated: false });
    },

    reservation: null,
    setReservation: (data) =>
      set((state) => ({
        reservation: { ...(state.reservation || {}), ...data },
      })),

    clearReservation: () => set({ reservation: null }),
  };
});

export default useAppState;