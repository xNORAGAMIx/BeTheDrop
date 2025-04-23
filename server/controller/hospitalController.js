import Inventory from "../models/inventoryModel.js";
import User from "../models/userModel.js";
import Donation from "../models/donationModel.js";
import inventoryModel from "../models/inventoryModel.js";
import Hopital from "../models/hospitalModel.js";
import BloodTransfer from "../models/bloodTransferModel.js";

// POST - Record a donation
export const recordDonation = async (req, res) => {
  try {
    const hospitalUser = await User.findById(req.body.userId);
    // console.log("Hospital User", hospitalUser);

    const { bloodGroup, quantityInML, email } = req.body;

    const isValidDonor = await User.findOne({ email: email });

    if (!isValidDonor) {
      return res.status(400).json({
        status: false,
        message: "Invalid donor email address",
      });
    }

    if (isValidDonor.bloodGroup !== bloodGroup) {
      return res.status(400).json({
        status: false,
        message: "Blood group of donor and donation do not match",
      });
    }

    //console.log(isValidDonor);

    if (!email || !bloodGroup || !quantityInML) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // 1. Create donation record
    const donation = await Donation.create({
      donor: isValidDonor._id,
      hospital: hospitalUser.hospitalId,
      recordedBy: hospitalUser._id,
      bloodGroup,
      quantityInML,
      donationDate: new Date(),
    });

    // 2. Update donor's history and last donation date
    await User.findByIdAndUpdate(isValidDonor._id, {
      $push: { donationHistory: donation._id },
      lastDonationDate: new Date(),
    });

    // 3. Update inventory
    await inventoryModel.findOneAndUpdate(
      {
        hospital: hospitalUser.hospitalId,
        bloodGroup: bloodGroup,
      },
      {
        $inc: { quantityInML: quantityInML },
        $set: { lastUpdated: new Date() },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      status: true,
      message: "Donation recorded successfully",
      donation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Error In Record Donation API",
      error,
    });
  }
};

// GET - Get the inventory of the current hospital
export const getHospitalInventory = async (req, res) => {
  try {
    const hospitalId = await User.findById(req.body.userId).select(
      "hospitalId"
    );
    //console.log(hospitalId.hospitalId);

    const inventory = await Inventory.find({
      hospital: hospitalId.hospitalId,
    }).select("bloodGroup quantityInML lastUpdated");

    res.status(200).json({
      status: true,
      message: "Inventory fetched successfully",
      inventory,
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

// GET - Get the donations made to the current hospital
export const getHospitalDonations = async (req, res) => {
  try {
    //console.log(req.body.userId);
    
    const hospitalId = await User.findById(req.body.userId).select(
      "hospitalId"
    );
    //console.log(hospitalId.hospitalId);
    

    const donations = await Donation.find({ hospital: hospitalId.hospitalId })
      .populate("donor", "name email phone isAvailable")
      .populate("hospital", "name address phone")
      .select("donor hospital bloodGroup quantityInML donationDate");

    res.status(200).json({
      status: true,
      message: "Donations fetched successfully",
      donations,
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

// GET - Get the blood summary of the current hospital
export const getBloodSummary = async (req, res) => {
  try {
    const hospitalId = await User.findById(req.body.userId).select(
      "hospitalId"
    );

    const bloodSummary = await inventoryModel.aggregate([
      {
        $match: {
          hospital: hospitalId.hospitalId,
        },
      },
      {
        $group: {
          _id: "$bloodGroup",
          totalQuantity: { $sum: "$quantityInML" },
          lastUpdated: { $max: "$lastUpdated" },
        },
      },
      {
        $project: {
          _id: 0,
          bloodGroup: "$_id",
          totalQuantity: 1,
          lastUpdated: 1,
        },
      },
    ]);
    res.status(200).json({
      status: true,
      message: "Blood summary fetched successfully",
      bloodSummary,
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

// POST - Transfer blood to another hospital
export const transferBlood = async (req, res) => {
  try {
    const { toHospitalEmail, bloodGroup, quantityInMl } = req.body;

    const toHospital = await Hopital.findOne({ email: toHospitalEmail }).select(
      "_id"
    );
    const fromHospital = await User.findById(req.body.userId).select(
      "hospitalId"
    );

    console.log(toHospital, fromHospital);

    if (!toHospital || !bloodGroup || !quantityInMl) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if (fromHospital.hospitalId === toHospital._id) {
      return res.status(400).json({
        status: false,
        message: "You cannot transfer blood to your own hospital",
      });
    }

    // check if sufficient blood is available
    const inventory = await inventoryModel.findOne({
      hospital: fromHospital.hospitalId,
      bloodGroup,
    });

    if (!inventory || inventory.quantityInML < quantityInMl) {
      return res.status(400).json({
        status: false,
        message: "Insufficient blood available",
      });
    }

    // Deduct the quantity from the fromHospital inventory
    inventory.quantityInML -= quantityInMl;
    await inventory.save();

    // add the quantity to the toHospital inventory
    await inventoryModel.findOneAndUpdate(
      {
        hospital: toHospital._id,
        bloodGroup,
      },
      {
        $inc: { quantityInML: quantityInMl },
        $set: { lastUpdated: new Date() },
      },
      { new: true, upsert: true }
    );

    // record the transfer
    await BloodTransfer.create({
      fromHospital: fromHospital.hospitalId,
      toHospital: toHospital._id,
      bloodGroup,
      quantityInML: quantityInMl,
      transferDate: new Date(),
      recordedBy: req.body.userId,
    });

    res.status(200).json({
      status: true,
      message: "Blood transferred successfully",
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

// GET - Get the blood transfers sent by the current hospital
export const getSentTransfers = async (req, res) => {
  try {
    const hospitalId = await User.findById(req.body.userId).select(
      "hospitalId"
    );

    const transfers = await BloodTransfer.find({
      fromHospital: hospitalId.hospitalId,
    })
      .populate("toHospital", "name contact email")
      .populate("recordedBy", "name contact")
      .sort({ transferDate: -1 });

    res.status(200).json({
      status: true,
      message: "Sent transfers fetched successfully",
      transfers,
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

// GET - Get the blood transfers received by the current hospital
export const getReceivedTransfers = async (req, res) => {
  try {
    const hospitalId = await User.findById(req.body.userId).select(
      "hospitalId"
    );

    const transfers = await BloodTransfer.find({
      toHospital: hospitalId.hospitalId,
    })
      .populate("toHospital", "name contact email")
      .populate("recordedBy", "name contact")
      .sort({ transferDate: -1 });

    res.status(200).json({
      status: true,
      message: "Received transfers fetched successfully",
      transfers,
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

export const getHospitalById = async (req, res) => {
  try {
    const hospitalId = req.params.id;

    const hospital = await Hopital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({
        status: false,
        message: "Hospital not found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Hospital fetched successfully",
      hospital,
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
