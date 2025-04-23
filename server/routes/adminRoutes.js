import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addHospital,
  deleteDonor,
  donorList,
  hospitalList,
  organizationList,
} from "../controller/adminController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();


//GET || DONOR LIST
router.get("/donor-list", authMiddleware, donorList);

//GET || HOSPITAL LIST
router.get("/hospital-list", authMiddleware, hospitalList);

//GET || ORGANISATION LIST
router.get(
  "/organisation-list",
  authMiddleware,
  adminMiddleware,
  organizationList
);

// DELETE DONAR
router.delete(
  "/delete-donor/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonor
);

// DELETE HOSPITAL

// DELETE ORGANISATION

// ADD HOSPITAL
router.post("/add-hospital", authMiddleware, adminMiddleware, addHospital);

export default router;
