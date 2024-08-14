import express from "express";
import { login, signIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/login", login);

export default router;
