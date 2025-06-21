import Hospital from "../models/hospitalModel.js";
import User from "../models/userModel.js";

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

// delete hospital
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.body;
    // delete employee of hospital
    await User.deleteMany({ hospitalId: id });
    const response = await Hospital.findByIdAndDelete(id);
    
    return res.status(200).json({
      status: true,
      message: "Hospital deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Error deleting hospital",
    });
  }
};

// add hospital
export const addHospital = async (req, res) => {
  try {
    //check existing email for hospital
    const existingHospital = await Hospital.findOne({ email: req.body.email });
    if (existingHospital) {
      return res.status(400).json({
        status: false,
        message: "Hospital already exists",
      });
    }
    //create new hospital
    const newHospital = new Hospital({
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      email: req.body.email,
      website: req.body.website,
    });
    await newHospital.save();
    return res.status(200).json({
      status: true,
      message: "Hospital added successfully",
      newHospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Error In Add Hospital API",
      error: error.message,
    });
  }
};
