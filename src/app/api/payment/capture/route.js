import { instance } from "@/utils/razorpay";
import Product from "@/models/productDetails";
import connectDB from "@/dbconfig/dbconfig";
import mongoose from "mongoose";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      product,
      userId,
      grandTotal,
      gstRate,
      shipping,
      subtotal,
      selectedAddressId,
    } = body;
    console.log("product for payment capture", product);
    if (
      !product ||
      product.length === 0 ||
      !userId ||
      !grandTotal ||
      !gstRate ||
      !shipping ||
      !subtotal ||
      !selectedAddressId
    ) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const uid = new mongoose.Types.ObjectId(userId);

    for (const item of product) {
      const { productId, quantity } = item;
      const items = await Product.findById(productId);
      if (!items) {
        return Response.json(
          { success: false, message: "Product not found" },
          { status: 404 }
        );
      }
      const enrolled = items.studentsEnrolled || [];
      if (Array.isArray(enrolled) && enrolled.includes(uid)) {
        return Response.json(
          { success: false, message: "Already purchased this product" },
          { status: 400 }
        );
      }
    }

    const options = {
      amount: Math.round(grandTotal * 100), // Razorpay takes amount in paise
      currency: "INR",
      receipt: "order_rcptid_" + Math.floor(Math.random() * 1000000),
    };

    const paymentResponse = await instance.orders.create(options);
    console.log("payment receipt", paymentResponse);
    return Response.json(
      {
        success: true,
        message: {
          key: process.env.RAZORPAY_KEY,
          amount: paymentResponse.amount,
          currency: paymentResponse.currency,
          name: "EmbProto",
          description: "Order Payment",
          order_id: paymentResponse.id,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in capture route:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
