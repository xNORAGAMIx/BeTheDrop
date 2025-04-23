import express from "express";
import { getAnalytics } from "../controllers/analysticsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//GET || BLOOD DATA
router.get("/blood-data", authMiddleware, getAnalytics);

export default router;
