import express from "express";
import {
  registerController,
  loginController,
  dashboardController,
} from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//REGISTER
router.post("/register", registerController);
//LOGIN
router.post("/login", loginController);
//LOGOUT
router.post("/logout");
//CURRENT USER
router.get("/dashboard", authMiddleware, dashboardController);

export default router;
