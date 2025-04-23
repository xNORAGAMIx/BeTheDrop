import userModel from "../models/userModel.js";

//donor list
export const donorList = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      Toatlcount: donorData.length,
      message: "Donor List Fetched Successfully",
      donorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Donor List API",
      error,
    });
  }
};

//hospital list
export const hospitalList = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};

//organization list
export const organizationList = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};

//delete donor
export const deleteDonor = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};
