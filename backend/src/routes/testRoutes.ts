import { Router } from "express";
import { testSupabase } from "../controllers/testController";

const router = Router();

router.get("/", testSupabase);

export default router;