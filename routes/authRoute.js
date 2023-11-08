import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfile,
  getordersControllers,
  manageordersControllers,
  manageStatusControllers,
} from "../controllers/authController.js";
import { requireSignIN, isAdmin } from "../middlewares/authMiddleware.js";
     

///router Object
const router = express.Router();
router.post("/get-register", registerController);

//Login || POST
router.post("/login", loginController);

//forgot password || post

router.post('/forgot-password',forgotPasswordController)

//test Route
router.get("/test", requireSignIN, isAdmin, testController);

//protected route auth

router.get('/user-auth', requireSignIN,(req,res)=>{
  res.status(200).send({ok:true});
});

//admin dashboard ascess
router.get('/admin-auth', requireSignIN,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
});
router.put('/update-profile', requireSignIN, updateProfile)

//orders
router.get('/orders',requireSignIN,getordersControllers)

//all-orders
router.get('/manage-orders',requireSignIN,isAdmin,manageordersControllers)
//all-orders
router.put('/manage-status/:orderId',requireSignIN,isAdmin,manageStatusControllers)

export default router;
