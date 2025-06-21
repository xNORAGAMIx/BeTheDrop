import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
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
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 86400 },
    },
  },
  { timestamps: true }
);

const Alert = mongoose.model("alerts", alertSchema);
export default Alert;
