import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes";
import testRoutes from "./routes/testRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Abstrabit Backend Running 🚀",
  });
});

export default app;