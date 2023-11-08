import { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparepassword, hashpassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//---------------------Register controller------------------------------------->>
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Hash the password
    const hashedPassword = await hashpassword(password);

    // Create a new user
    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
    });
  }
};
//------------------------------------------------------------------------>

//login route POST---------------------------------------------------------->

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparepassword(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------->>
//-------------------------- forgot pass------------------------------------->>

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    
    if (!email || !answer || !newpassword) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }
    
    const user = await userModel.findOne({ email, answer });
    
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong Email or answer",
      });
    }
    
    const hashed = await hashpassword(newpassword);
    
    if (user._id) {
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successful",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "User ID is not defined or invalid",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};


//test controller

export const testController = (req, res) => {
  res.send("procted");
};

//updateing porile detiles
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);

    // Input validation and sanitization

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,

        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "updated",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//getorders-------------------------------------------------------------------------------------
export const getordersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "API Error",
      error,
    });
  }
};

//manage-ordersControllers---------------------------------------------------------------------
export const manageordersControllers = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "API Error",
      error,
    });
  }
};

//manage status----------------------------------------------
export const manageStatusControllers = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in API",
    });
  }
};
