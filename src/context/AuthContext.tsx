import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";

type AuthContextType = {
  user: unknown ;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<unknown >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // get currrent user session
    const getSession = async () => {
      const { data} = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    // login-logout listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
