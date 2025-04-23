import express from "express";
import { testController } from "../controller/testController.js";

const router = express.Router();

//routes
router.get("/", testController);

export default router;
