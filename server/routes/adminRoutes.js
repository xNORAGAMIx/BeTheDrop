import express from "express";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addHospital, deleteHospital } from "../controller/adminController.js";

const router = express.Router();

// GET DONORS

// DELETE DONORS UNAVAILBLE OVER 60 DAYS

// REGISTER A HOSPITAL NAME
router.post("/add-hospital", authMiddleware, adminMiddleware, addHospital);

// DELETE HOSPITAL
router.delete(
  "/delete-hospital",
  authMiddleware,
  adminMiddleware,
  deleteHospital
);

// ANALYTICS

export default router;
