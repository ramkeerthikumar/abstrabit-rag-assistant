import { supabase } from "../config/supabase";

export const getWorkspaces = async () => {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("GET WORKSPACES ERROR:", error);
    return [];
  }

  return data;
};

export const createWorkspace = async (name: string) => {
  try {
    // 🔐 STEP 1: Get session (more reliable than getUser)
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    console.log("SESSION:", sessionData);

    if (sessionError || !sessionData.session) {
      console.error("No active session");
      return null;
    }

    const user = sessionData.session.user;

    if (!user) {
      console.error("No user found in session");
      return null;
    }

    console.log("USER ID:", user.id);

    // 🔥 STEP 2: Insert workspace
    const { data, error } = await supabase
      .from("workspaces")
      .insert([
        {
          name,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("CREATE WORKSPACE ERROR:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Workspace failed:", err);
    return null;
  }
};