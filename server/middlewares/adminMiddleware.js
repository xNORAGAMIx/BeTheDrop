import userModel from "../models/userModel.js";

export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    //check admin
    if (user?.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "AUth Fialed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,
    });
  }
};
