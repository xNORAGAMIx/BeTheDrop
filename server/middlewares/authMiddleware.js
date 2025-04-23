import jwt from "jsonwebtoken";

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
