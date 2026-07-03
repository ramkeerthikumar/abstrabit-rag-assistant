import { Request, Response } from "express";
import { processDocument } from "../services/uploadService";

export async function uploadDocument(
  req: Request,
  res: Response
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const workspaceId = req.body.workspace_id;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspace_id is required",
      });
    }

    const result = await processDocument(
      req.file,
      workspaceId
    );

    res.json({
      success: true,
      documentId: result.documentId,
      fileName: result.fileName,
      characters: result.characters,
preview: result.preview,
    });
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
}