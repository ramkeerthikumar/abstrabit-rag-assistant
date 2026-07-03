export function chunkText(text: string, chunkSize = 1000, overlap = 150) {
  const chunks: string[] = [];

  let i = 0;

  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);

    const chunk = text.slice(i, end);

    chunks.push(chunk);

    i += chunkSize - overlap;
  }

  return chunks;
}