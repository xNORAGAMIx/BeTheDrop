import Response from "../models/responseModel.js";

// Respond to alert - donor
export const createResponse = async (req, res) => {
  try {
    const { alertId, response } = req.body;

    const newResponse = new Response({
      donorId: req.body.userId,
      alertId,
      response,
    });
    await newResponse.save();
    res.status(201).json({
      status: true,
      message: "Response created successfully",
      newResponse,
    });
  } catch (error) {
    console.error("Error creating response:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get all responses for an alert - hospital
export const getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find({ alertId: req.params.alertId })
      .populate("donorId", "name contact") // Populate donorId with name and email
      .populate("alertId", "bloodGroup message"); // Populate alertId with title and description

    if (responses.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No responses found for this alert",
      });
    }
    res.status(200).json({
      status: true,
      message: "Responses fetched successfully",
      responses,
    });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get all responses by a donor - donor
export const getResponsesByDonor = async (req, res) => {
  try {
    const responses = await Response.find({
      donorId: req.body.userId,
    }).populate("alertId", "status message hospitalId bloodGroup");

    if (responses.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No responses found for this donor",
      });
    }
    res.status(200).json({
      status: true,
      message: "Responses fetched successfully",
      responses,
    });
  } catch (error) {
    console.error("Error fetching responses by donor:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Get donor responses for a specific alert - donor
export const getDonorResponse = async (req, res) => {
  try {
    const { alertId, userId } = req.body;

    if (!userId || !alertId) {
      return res.status(400).json({
        status: false,
        message: "Missing userId or alertId in request body",
      });
    }

    const response = await Response.findOne({
      donorId: userId,
      alertId: alertId,
    })
      .populate("donorId", "name email bloodGroup")
      .populate("alertId", "bloodGroup message");

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "No response found for this donor and alert",
      });
    }

    res.status(200).json({
      status: true,
      message: "Response fetched successfully",
      response,
    });
  } catch (error) {
    console.error("Error fetching donor response:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// Toggle response status - donor
export const toggleResponseStatus = async (req, res) => {
  try {
    const { responseId } = req.body;

    if (!responseId) {
      return res.status(400).json({
        status: false,
        message: "Missing responseId in request body",
      });
    }

    const response = await Response.findById(responseId);

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "Response not found",
      });
    }

    // Toggle the response status
    response.response = response.response === "Yes" ? "No" : "Yes";
    await response.save();

    res.status(200).json({
      status: true,
      message: "Response status toggled successfully",
      response,
    });
  } catch (error) {
    console.error("Error toggling response status:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}