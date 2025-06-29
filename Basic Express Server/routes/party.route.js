import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createParty } from "../controllers/party.controller.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.route("/create").get(isAuthenticated,isAdmin,createParty);

export default router;