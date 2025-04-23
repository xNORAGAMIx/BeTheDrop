import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Auth Error" });
      } else {        
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Auth Error", error: error.message });
  }
};

export const isHospitalUser = async (req,res,next) => {
  const user = await userModel.findById(req.body.userId);
  
  
  if (user && user.role === "hospital") {
    return next();
  }
  return res.status(403).json({
    status: false,
    message: "Access denied. Not a hospital user.",
  });
} 