import express from "express";
import {
  authMiddleware,
  isHospitalUser,
} from "../middlewares/authMiddleware.js";
import {
  createResponse,
  getAllResponses,
  getDonorResponse,
  getResponsesByDonor,
  toggleResponseStatus,
} from "../controller/responseController.js";

const router = express.Router();

router.post("/", authMiddleware, createResponse);

// Get donor response for a specific alert
router.post("/donor", authMiddleware, getDonorResponse);

// 
router.get("/alert/:alertId", authMiddleware, isHospitalUser, getAllResponses);

router.get("/donor-responses", authMiddleware, getResponsesByDonor);

// Toggle response status
router.post("/toggle-response", authMiddleware, toggleResponseStatus)

export default router;
