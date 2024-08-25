import express from "express";
import { getWriterProfile } from "../controllers/writerController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/profile", authenticateToken, getWriterProfile);

export default router;
