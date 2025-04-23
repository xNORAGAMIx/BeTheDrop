import express from "express";
import {
  authMiddleware,
  isHospitalUser,
} from "../middlewares/authMiddleware.js";
import {
  createAlert,
  getAlertById,
  getAlertsByHospital,
  getAllActiveAlerts,
  getAllActiveAlertsByHospital,
  toggleAlertStatus,
} from "../controller/alertController.js";

const router = express.Router();

// Hopital functionality (ok)
router.post("/", authMiddleware, isHospitalUser, createAlert);

// Get all active alerts - Hospital + Donor (ok)
router.get("/", getAllActiveAlerts);


// Get all active alerts by current hospital - Hospital (ok)
router.get("/active", authMiddleware, isHospitalUser, getAllActiveAlertsByHospital);

// Get all alerts for current hospital - Hospital (ok)
router.get("/hospital", authMiddleware, isHospitalUser, getAlertsByHospital);

// Toggle alert status - Hospital (ok)
router.post("/toggle-alert", authMiddleware, isHospitalUser, toggleAlertStatus);


// Get alert by ID - Hospital + Donor (ok)
router.get("/:id", authMiddleware, getAlertById);
// 

export default router;
