import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { connectDB } from './config/db.js';

dotenv.config();

connectDB();


const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})