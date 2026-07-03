import { Router } from "express";
import { chatController } from "../controllers/chatController";

const router = Router();

// POST /api/chat
router.post("/", chatController);

export default router;