import express from "express";
import { requireSignIN, isAdmin } from "../middlewares/authMiddleware.js"; // Import isAdmin once
import {
  productController,
  getproductController,
  getsingleproductController,
  getphotoController,
  deleteproductController,
  updateproductController,
  getfilteredproductController,
  productCountController,
  productLoadperpageController,
  searchproductController,
  relatedproductController,
  brintreetokenController,
  brainTreePaymentControllerr,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes

//adding category--------------------------------------------------
router.post(
  "/create-product",
  requireSignIN,
  isAdmin,
  formidable(),
  productController
);
//get all Product---------------------------------------------------
router.get("/getproduct", getproductController);

//get filtered producr -------------------------
router.post("/product-filter", getfilteredproductController);

//get single Product------------------------------------------------
router.get("/get-single-product/:slug", getsingleproductController);

//get single Product------------------------------------------------
router.get("/get-single-product/:slug", getsingleproductController);

//get photo---------------------------------------------------------
router.get("/get-photo/:pid", getphotoController);

// Delete Perticular Product----------------------------------------
router.delete(
  "/delete-product/:id",
  requireSignIN,
  isAdmin,
  deleteproductController
);

// Update Perticular Product----------------------------------------
router.put(
  "/update-product/:id",
  requireSignIN,
  isAdmin,
  formidable(),
  updateproductController
);
//product count
router.get("/product-count", productCountController);

//product load more
router.get("/product-list/:page", productLoadperpageController);

//search product
router.get("/search/:keyword",  searchproductController);

//similar Product 
router.get("/related/:pid/:cid",relatedproductController);

//Paymet route---------------------------------
//token
router.get("/braintree/token", brintreetokenController);

//payments-----------------------------------------
router.post("/braintree/payment", requireSignIN,brainTreePaymentControllerr);
export default router;
