import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  const embedding = result.embeddings?.[0]?.values ?? [];

  // IMPORTANT: truncate to 1536 safely
  return embedding.slice(0, 3072);
}