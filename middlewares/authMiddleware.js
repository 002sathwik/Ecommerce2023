import jwt from "jsonwebtoken"; // Use 'jwt' as the default import
import userModel from "../models/userModel.js";

// Protected Route
export const requireSignIN = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// checking  admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      // Check if user's role is not 1 (admin)
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
