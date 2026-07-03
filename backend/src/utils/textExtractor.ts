import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdf = require("pdf-parse");
import mammoth from "mammoth";

export async function extractText(
  filePath: string,
  originalName: string
): Promise<string> {

  const ext = path.extname(originalName).toLowerCase();

  if (ext === ".txt") {
    return fs.readFileSync(filePath, "utf8");
  }

  if (ext === ".pdf") {
    const data = await pdf(fs.readFileSync(filePath));
    return data.text;
  }

  if (ext === ".docx") {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  throw new Error(`Unsupported file type: ${ext}`);
}