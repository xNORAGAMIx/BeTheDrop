import express from "express";
import {
  registerController,
  loginController,
} from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//REGISTER
router.post("/register", registerController);
//LOGIN
router.post("/login", loginController);
//LOGOUT
router.post("/logout");


export default router;
