import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "OutofDelivery",
        "Delivered",
        "Canceled",
      ],
    },
  },
  { timeseries: true }
);

export default mongoose.model("Order", orderSchema);
