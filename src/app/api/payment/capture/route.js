import { instance } from "@/utils/razorpay";
import Product from "@/models/productDetails";
 
import { getServerSession } from "next-auth";
import connectDB from "@/dbconfig/dbconfig";
import mongoose from "mongoose";
import { authOptions } from "@/utils/authOptions";  
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { product } = body;
    console.log("product for payment capture",product)
    const session = await getServerSession(authOptions);
    const userId = session.user?._id;

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
          { success: false, message: "Already enrolled in a product" },
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

    return Response.json(
      { success: true, message: paymentResponse },
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
