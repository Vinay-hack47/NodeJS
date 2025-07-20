import express from "express";
import { login, logout, refresh, register } from "../controllers/user.controller.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginLimiter, login);
router.route("/logout").post(logout);
router.route("/refresh").post(refresh);

export default router;