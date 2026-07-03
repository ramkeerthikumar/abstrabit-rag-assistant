import { Request, Response } from "express";
import { generateAnswer } from "../services/ragService";

export async function chatController(req: Request, res: Response) {
  try {
    const { question, workspace_id } = req.body;

    if (!question || !workspace_id) {
      return res.status(400).json({
        success: false,
        message: "question and workspace_id are required",
      });
    }

    const answer = await generateAnswer(question, workspace_id);

    return res.json({
      success: true,
      answer,
    });
  } catch (err: any) {
    console.error("CHAT CONTROLLER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Chat failed",
    });
  }
}