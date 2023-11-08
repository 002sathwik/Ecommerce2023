import slugify from "slugify";
import JWT from "jsonwebtoken";

import categoryModel from "../models/categoryModel.js";

// add category----------------------------------------------------------------------------
export const categoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "name filed required",
      });
    }
    const existingcategoy = await categoryModel.findOne({ name });
    if (existingcategoy) {
      return res.status(200).send({
        success: ture,
        message: "Category Already Existing",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "NewCategory Added",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in category",
    });
  }
};

//update category----------------------------------------------------------------------------
export const updatecategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Find the category by ID and update it
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating",
    });
  }
};

//get all category from database------------------------------------------------------------------
export const getcategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: " All  Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

//get single category---------------------------------------------------------------------------
export const getsinglecategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Category Found",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting  single categories",
    });
  }
};

//delete category----------------------------------------------------------------------------------
export const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Not deleted",
      error,
    });
  }
};
