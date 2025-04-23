import express from "express";
import { getDonors, getHospitals } from "../controller/publicController.js";

const router = express.Router();

// GET HOSPITAL LIST
router.get("/hospitals", getHospitals);

// GET DONOR LIST
router.get("/donors", getDonors);

export default router;
