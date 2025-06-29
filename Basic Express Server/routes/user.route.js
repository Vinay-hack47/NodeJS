import express from "express";
import { vote, welcome } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/greet").get(welcome);
router.route("/vote").get(isAuthenticated,vote);

export default router;