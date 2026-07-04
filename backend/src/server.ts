import express from "express";
import cors from "cors";

import chat from "./routes/chat";
import uploadRoutes from "./routes/uploadRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROUTES (THIS WAS YOUR MAIN ISSUE)
app.use("/api/chat", chat);
app.use("/api/upload", uploadRoutes);

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});