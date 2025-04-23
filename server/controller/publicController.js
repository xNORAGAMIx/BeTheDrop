import User from "../models/userModel.js";
import Hopital from "../models/hospitalModel.js";

// Hospital List
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hopital.find({}).select(
      "name address contact email website"
    );

    res.status(200).json({
      status: true,
      message: "Hospitals fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Donor List
export const getDonors = async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }).select(
      "name email contact gender bloodGroup address healthCondition isAvailable"
    );
    if (!donors) {
      return res.status(404).json({
        message: "No donors found",
        status: false,
      });
    }
    res.status(200).json({
      message: "Donors fetched successfully",
      status: true,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: false,
    });
  }
};
