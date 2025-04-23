import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//register
export const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    console.log(req.body);

    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(200).json({
      status: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid credentials" });
    }

    //check role
    if (user.role !== req.body.role) {
      return res
        .status(500)
        .json({ status: false, message: "Role does not match" });
    }
    //compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid credentials" });
    }
    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

