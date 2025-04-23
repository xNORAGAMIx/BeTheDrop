import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createInventory,
  getDonorInventory,
  getHospital,
  getHospitalInventory,
  getInventory,
  getOrganisation,
  getOrganisationForHospital,
  getRecentRecords,
} from "../controller/inventoryController.js";

const router = express.Router();

//create
router.post("/create", authMiddleware, createInventory);
//all blood records
router.get("get-inventory", authMiddleware, getInventory);
//recent blood records
router.get("get-recent-inventory", authMiddleware, getRecentRecords);
//hospital blood records
router.get("get-hospital-inventory", authMiddleware, getHospitalInventory);
//donor blood records
router.get("get-donor-inventory", authMiddleware, getDonorInventory);
//hospital records
router.get("get-hospital", authMiddleware, getHospital);
//organisation records
router.get("get-organisation", authMiddleware, getOrganisation);
//organisation for hospital
router.get(
  "get-organisation-hospital",
  authMiddleware,
  getOrganisationForHospital
);

export default router;
