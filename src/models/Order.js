import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    selectedAddressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
    status: { type: String, default: "Pending" },
    subtotal: Number,
    shipping: Number,
    gstRate: Number,
    discount: Number,
    grandTotal: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
