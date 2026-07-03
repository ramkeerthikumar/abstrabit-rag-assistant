import fs from "fs";
import crypto from "crypto";

import supabase from "../config/supabase";
import { extractText } from "../utils/textExtractor";
import { chunkText } from "../utils/chunkText";
import { generateEmbedding } from "./embeddingService";

export async function processDocument(
  file: Express.Multer.File,
  workspaceId: string
) {
  try {
    // 1. Read file
    const fileBuffer = fs.readFileSync(file.path);

    const fileHash = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    const storagePath = `${workspaceId}/${Date.now()}-${file.originalname}`;

    // 2. Upload to storage
    const { error: storageError } = await supabase.storage
      .from("documents")
      .upload(storagePath, fileBuffer, {
        contentType: file.mimetype,
      });

    if (storageError) {
      throw storageError;
    }

    // 3. Save document metadata
    const { data: doc, error: docError } = await supabase
      .from("documents")
      .insert({
        workspace_id: workspaceId,
        filename: file.originalname,
        file_hash: fileHash,
        storage_path: storagePath,
      })
      .select()
      .single();

    if (docError || !doc) {
      throw docError || new Error("Document insert failed");
    }

    // 4. Extract text
    const text = await extractText(file.path, file.originalname);

    // delete temp file
    fs.unlinkSync(file.path);

    const chunks = chunkText(text);

    // 5. Insert chunks safely
    for (let i = 0; i < chunks.length; i++) {
      try {
        const embedding = await generateEmbedding(chunks[i]);

        if (!embedding || embedding.length === 0) continue;

        const { error } = await supabase.from("document_chunks").insert({
          workspace_id: workspaceId,
          document_id: doc.id,
          chunk_index: i,
          chunk_text: chunks[i],
          embedding,
          page_number: null,
        });

        if (error) {
          console.error("CHUNK INSERT ERROR:", error);
        }
      } catch (err) {
        console.error("EMBEDDING ERROR:", err);
      }
    }

    // 6. SAFE RESPONSE (IMPORTANT)
    return {
      success: true,
      documentId: doc.id,
      fileName: file.originalname,
      characters: text.length,
      preview: text.substring(0, 500),
    };
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);

    return {
      success: false,
      message: err.message || "Upload failed",
    };
  }
}