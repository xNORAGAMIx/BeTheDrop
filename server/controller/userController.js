import User from "../models/userModel.js";

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
      .populate("hospitalId", "name")
      .select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: false,
      });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: false,
    });
  }
};

// Get donations made
export const getDonationHistory = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).populate({
      path: "donationHistory",
      populate: [
        {
          path: "hospital",
          select: "name",
        },
        {
          path: "recordedBy",
          select: "name",
        },
      ],
    });

    return res.status(200).json({
      message: "User donation history fetched successfully",
      status: true,
      donationHistory: user.donationHistory,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: false,
    });
  }
};

// Add a health conditions
export const addHealthCondition = async (req, res) => {
  try {
    const { condition } = req.body;
    const userId = req.body.userId;

    if (!condition) {
      return res.status(400).json({ message: "Condition is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { healthConditions: condition } }, // $addToSet prevents duplicates
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Health condition added",
      healthConditions: user.healthConditions,
    });
  } catch (error) {
    console.error("Error adding health condition:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Delete a health condition
export const deleteHealthCondition = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { condition } = req.body;

    if (!condition) {
      return res.status(400).json({ message: "Condition is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { healthConditions: condition } }, // removes exact match
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "Health condition removed successfully",
      healthConditions: updatedUser.healthConditions,
    });
  } catch (error) {
    console.error("Error removing health condition:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

// toggle availability
export const toggleAvailability = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId);

    user.isAvailable = !user.isAvailable;
    await user.save();
    res.status(200).json({
      status: true,
      message: "Availability updated",
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};
