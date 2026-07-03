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
  const { data, error } = await supabase
    .from("workspaces")
    .insert([{ name }])
    .select();

  if (error) {
    console.error("CREATE WORKSPACE ERROR:", error);
    return null;
  }

  return data?.[0];
};