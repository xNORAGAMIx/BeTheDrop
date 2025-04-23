import express from 'express';
import { authMiddleware, isHospitalUser } from '../middlewares/authMiddleware.js';
import { getHospitalAnalytics } from '../controller/analyticsController.js';

const router = express.Router();

router.get("/hospital", authMiddleware, isHospitalUser , getHospitalAnalytics);

export default router;
