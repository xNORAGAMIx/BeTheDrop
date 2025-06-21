import Alert from "../models/alertModel.js";
import User from "../models/userModel.js";
import { io } from "../server.js";

// Raise alert - for hospital
export const createAlert = async (req, res) => {
  try {
    const { bloodGroup, message } = req.body;
    const hospitalId = await User.findById(req.body.userId);

    // Validate input
    if (!bloodGroup || !message) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    // Create new alert
    const newAlert = new Alert({
      bloodGroup,
      message,
      hospitalId: hospitalId.hospitalId,
    });

    await newAlert.save();

    io.emit("new-alert", newAlert.message);

    res.status(201).json({
      status: true,
      message: "Alert created successfully",
      newAlert,
    });
  } catch (error) {
    console.error("Error creating alert:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get all active alerts - for admin/donor
export const getAllActiveAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: "active" }).populate(
      "hospitalId",
      "name"
    );
    res.status(200).json({ status: true, alerts });
  } catch (error) {
    console.error("Error fetching active alerts:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get all alerts by current hospital - for hospital/admin
export const getAlertsByHospital = async (req, res) => {
  try {
    const hospital = await User.findById(req.body.userId);
    const alerts = await Alert.find({
      hospitalId: hospital.hospitalId,
    }).populate("hospitalId", "name");

    res.status(200).json({
      status: true,
      alerts,
    });
  } catch (error) {
    console.error("Error fetching alerts by hospital:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getAllActiveAlertsByHospital = async (req, res) => {
  try {
    const hospital = await User.findById(req.body.userId);
    const alerts = await Alert.find({
      hospitalId: hospital.hospitalId,
      status: "active",
    }).populate("hospitalId", "name");

    res.status(200).json({
      status: true,
      alerts,
    });
  } catch (error) {
    console.error("Error fetching alerts by hospital:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getAlertById = async (req, res) => {
  try {
    const id = req.params.id;
    const alert = await Alert.find({
      _id: id,
      status: "active",
    }).populate("hospitalId", "name");
    if (!alert) {
      return res
        .status(404)
        .json({ status: false, message: "Alert not found" });
    }
    res.status(200).json({ status: true, alert: alert[0] });
  } catch (error) {
    console.error("Error fetching alert by ID:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Change alert status - for hospital
export const toggleAlertStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const alert = await Alert.findById(id);
    if (!alert) {
      return res
        .status(404)
        .json({ status: false, message: "Alert not found" });
    }

    alert.status = "completed";

    await alert.save();

    res
      .status(200)
      .json({ status: true, message: "Alert status updated", alert });
  } catch (error) {
    console.error("Error toggling status:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};
