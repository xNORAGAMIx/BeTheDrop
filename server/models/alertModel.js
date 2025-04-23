import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active",
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospitals", // Reference to Hospital model
    required: true,
  },
}, { timestamps: true });

const Alert = mongoose.model("alerts", alertSchema);
export default Alert;
