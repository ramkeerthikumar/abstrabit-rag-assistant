import supabase from "../config/supabase";
import { generateEmbedding } from "./embeddingService";
import { GoogleGenAI } from "@google/genai";
import { executeTool } from "./toolService";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateAnswer(question: string, workspaceId: string) {
  try {
    const cleanQuestion = question.toLowerCase().trim();

    // ----------------------------
    // 1. GENERAL CHAT MODE (NO RAG)
    // ----------------------------
    const isGeneralChat =
      ["hi", "hello", "hii", "hey", "good morning", "good evening"].includes(
        cleanQuestion
      );

    if (isGeneralChat) {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
      });

      return response.text;
    }

    // ----------------------------
    // 2. RAG MODE (DOCUMENT Q&A)
    // ----------------------------

    const embedding = await generateEmbedding(question);

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_count: 5,
      p_workspace_id: workspaceId,
    });

    if (error) throw error;

    const context =
      data?.map((d: any) => d.chunk_text).join("\n\n") ||
      "";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a workspace-based AI assistant.

RULES:
- Use ONLY the provided context when answering document questions
- If context is empty or insufficient, say: "I don't know based on the provided documents"
- Be concise and factual
- Do NOT hallucinate information

CONTEXT:
${context}

QUESTION:
${question}
      `,
    });

    const text = response.text || "";

    // ----------------------------
    // 3. TOOL EXECUTION (SAFE LAYER)
    // ----------------------------

    const lowerText = text.toLowerCase();

    if (lowerText.includes("save task")) {
      const result = await executeTool(
        {
          name: "save_task",
          args: {
            title: question,
            description: question,
          },
        },
        workspaceId
      );

      return `${text}\n\n🛠 Tool Executed: ${result}`;
    }

    if (lowerText.includes("add note")) {
      const result = await executeTool(
        {
          name: "add_note",
          args: {
            content: question,
          },
        },
        workspaceId
      );

      return `${text}\n\n🛠 Tool Executed: ${result}`;
    }

    // ----------------------------
    // 4. FINAL RESPONSE
    // ----------------------------
    return text;
  } catch (err: any) {
    console.error("RAG ERROR:", err);
    return "Something went wrong while generating the answer.";
  }
}