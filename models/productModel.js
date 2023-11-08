import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },

    category: {
      //unique one find category and adding herer
      type: mongoose.ObjectId, // finding perticular category
      ref: "Category",
      require: true, //name given ther in categorymodel
    },
    quantity: {
      type: Number,
      require: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
