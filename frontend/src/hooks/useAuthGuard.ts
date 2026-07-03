import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

export function useAuthGuard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  return loading;
}