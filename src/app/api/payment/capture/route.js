import { instance } from "@/utils/razorpay";
import Product from "@/models/productDetails";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; 
import connectDB from "@/dbconfig/dbconfig";
import mongoose from "mongoose";
   
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { product } = body;
    console.log("product for payment capture",product)
    
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    if (!product || product.length === 0) {
      return Response.json(
        { success: false, message: "Please provide product IDs" },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const uid = new mongoose.Types.ObjectId(userId);

    for (const productId of product) {
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
      totalAmount += items.ProductPrice;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };


    const paymentResponse = await instance.orders.create(options);
  console.log("payment receipt",paymentResponse);
    return Response.json(
      { success: true, message: {
        key: process.env.RAZORPAY_KEY, 
        amount: paymentResponse.amount,
        currency: paymentResponse.currency,
        name: "EmbProto",
        description: "Order Payment",
        order_id: paymentResponse.id,
      }, },
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
