import { Request, Response } from "express";
import supabase from "../config/supabase";

export const testSupabase = async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*");

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
};