import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment Gateway--------------------------------------------------------------------------

 var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINEE_MERCHANT_ID,
  publicKey: process.env.BRAINEE_PUBLIC_KEY,
  privateKey: process.env.BRAINEE_PRIVATE_KEY,
});

// add category----------------------------------------------------------------------------
export const productController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(401).send({
        message: " All filed is required required",
      });
    }

    if (photo && photo.size > 1000000) {
      return res.status(401).send({
        message: "Phot is required and less then 1MB",
      });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in   adding product",
    });
  }
};

// get all product function ---------------------
export const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All product Found",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting  product",
    });
  }
};

// get Single product function ---------------------
export const getsingleproductController = async (req, res) => {
  try {
    const Singleproduct = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Perticular Product->found",
      Singleproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting Single  product",
    });
  }
};

// get Photo function ---------------------
export const getphotoController = async (req, res) => {
  try {
    const productphoto = await productModel
      .findById(req.params.pid)
      .select("photo");

    if (productphoto && productphoto.photo.data) {
      // Add a check for productphoto existence
      res.set("Content-Type", productphoto.photo.contentType); // Correct the header name
      return res.status(200).send(productphoto.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Product photo not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting Single product",
    });
  }
};

// Delete perticular Product ---------------------
export const deleteproductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "product  Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Deleteing product",
    });
  }
};
// Update particular Product ---------------------
export const updateproductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(401).send({
        message: " All filed is required required",
      });
    }

    if (photo && photo.size > 1000000) {
      return res.status(401).send({
        message: "Phot is required and less then 1MB",
      });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in   updating product",
    });
  }
};

//get filtered prodct-----------------------------------------------
export const getfilteredproductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Your filtered Products",
      products,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({
      success: false,
      message:
        "Filter not available. An error occurred while processing your request.",
    });
  }
};
//Product Count ---------------------

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({
      success: false,
      message: "Error in API request",
      error, // Include the error message in the response
    });
  }
};

//Load More product------------------------------------------
export const productLoadperpageController = async (req, res) => {
  try {
    const perpage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error In API",
      error,
    });
  }
};

//Search product------------------------------------------
export const searchproductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);

    console.log("Keyword:", keyword);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in  Search API",
      error,
    });
  }
};
//Get Related product
export const relatedproductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .populate("category") // Move populate() before select()
      .select("-photo")
      .limit(4);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "API error",
      error,
    });
  }
};

//payment gatway api
export const brintreetokenController= async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const brainTreePaymentControllerr= async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
            status: "Not Processed",
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};