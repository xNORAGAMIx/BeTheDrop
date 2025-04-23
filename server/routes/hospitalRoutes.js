import express from "express";
import {
  authMiddleware,
  isHospitalUser,
} from "../middlewares/authMiddleware.js";
import {
  getBloodSummary,
  getHospitalById,
  getHospitalDonations,
  getHospitalInventory,
  getReceivedTransfers,
  getSentTransfers,
  recordDonation,
  transferBlood,
} from "../controller/hospitalController.js";

const router = express.Router();



// CREATE A DONATION
router.post("/create-donation", authMiddleware, isHospitalUser, recordDonation);

// GET INVENTORY OF CURRENT HOSPITAL
router.get("/inventory", authMiddleware, isHospitalUser, getHospitalInventory);

// GET DONATIONS OF CURRENT HOSPITAL
router.get("/donations", authMiddleware, isHospitalUser, getHospitalDonations);

// GET BLOOD SUMMARY OF CURRENT HOSPITAL
router.get("/blood-summary", authMiddleware, isHospitalUser, getBloodSummary);

// TRRANSFER BLOOD TO OTHER HOSPITAL
router.post("/blood-transfer", authMiddleware, isHospitalUser, transferBlood);

// GET BLOOD TRANSFERS SENT BY CURRENT HOSPITAL
router.get("/transfer/sent", authMiddleware, isHospitalUser, getSentTransfers);

// GET BLOOD TRANSFERS RECEIVED BY CURRENT HOSPITAL
router.get("/transfers/received", authMiddleware, isHospitalUser, getReceivedTransfers);

// GET HOSPITAL BY ID
router.get("/:id", authMiddleware, getHospitalById);
export default router;
