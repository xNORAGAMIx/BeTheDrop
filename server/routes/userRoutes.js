import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addHealthCondition, deleteHealthCondition, getDonationHistory, getProfile } from "../controller/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.post("/add-health-condition", authMiddleware, addHealthCondition )

router.post("/remove-health-condition", authMiddleware, deleteHealthCondition )

router.get("/donation-history", authMiddleware, getDonationHistory);

export default router;