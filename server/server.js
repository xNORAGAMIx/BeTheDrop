// Dependencies | Packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Routes
import analyticsRoutes from "./routes/analyticsRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// DB method import
import { connectDB } from "./config/db.js";
// Load environment variables
dotenv.config();
// Connect to the database
connectDB();

// Initialize the Express application
const app = express();



// Create HTTP server
const server = http.createServer(app);

// Initialize Socket and attach to server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

export { io };

// Middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req,res) => {
  res.json({
    success: true,
    message: "Hello from backend (BeTheDrop)"
  })
})
app.use("/api/v1/analytics", analyticsRoutes); // Test route
app.use("/api/v1/public", publicRoutes); // Public route
app.use("/api/v1/auth", authRoutes); // Authentication route
app.use("/api/v1/user", userRoutes); // User profile route
app.use("/api/v1/hospital", hospitalRoutes); // Hopital functionality route
app.use("/api/v1/alert", alertRoutes); // Alert functionality route
app.use("/api/v1/response", responseRoutes); // Response management route
app.use("/api/v1/admin", adminRoutes); // Admin functionalities

// PORT
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
