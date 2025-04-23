import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Reference to user model
    required: true,
  },
  alertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "alerts", // Reference to Alert model
    required: true,
  },
  response: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
}, { timestamps: true });
const Response = mongoose.model("responses", responseSchema);
export default Response;
