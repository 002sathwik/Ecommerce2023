import express from "express";
import { requireSignIN, isAdmin } from "../middlewares/authMiddleware.js"; // Import isAdmin once
import {
  updatecategoryController,
  categoryController,
  getcategoryController,
  getsinglecategoryController,
  deletecategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// Routes

//adding category--------------------------------------------------
router.post("/create-category", requireSignIN, isAdmin, categoryController);

//updating category--------------------------------------------------
router.put(
  "/update-category/:id",
  requireSignIN,
  isAdmin,
  updatecategoryController
);

//get all category----------------------------------------------------
router.get("/getcategory", getcategoryController);

//get single category-------------------------------------------------
router.get("/get-single-category/:slug", getsinglecategoryController);

//delete category-------------------------------------------------------
router.delete(
  "/delete-category/:id",
  requireSignIN,
  isAdmin,
  deletecategoryController
);

export default router;
