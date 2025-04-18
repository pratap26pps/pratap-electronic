import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
