import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/dbconfig/dbconfig";
import Order from "@/models/Order";
import Product from "@/models/productDetails";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      product,
      userId,
      grandTotal,
      gstRate,
      shipping,
      subtotal,
      discount,
    } = body;
    console.log("graandtotal", grandTotal);
    if (
      !product ||
      !grandTotal ||
      !gstRate ||
      !shipping ||
      !subtotal ||
      !Array.isArray(product) ||
      product.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid product data" },
        { status: 400 }
      );
    }

    const products = await Product.find({ _id: { $in: product } });
    console.log("product", products);
    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: false, message: "Products not found" },
        { status: 404 }
      );
    }

    const newOrder = new Order({
      user: userId,
      products,
      paymentMethod: "COD",
      status: "Processing",
      subtotal,
      shipping,
      gstRate,
      discount,
      grandTotal,
    });

    await newOrder.save();
    const populatedOrder = await Order.findById(newOrder._id).populate(
      "products"
    );
    return NextResponse.json(
      {
        success: true,
        message: "order placed successfull",
        order: populatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("COD API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userid");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid orderId or userid  data" },
        { status: 400 }
      );
    }
    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(userId),
    })
      .populate("products")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return NextResponse.json(
        { success: false, message: "No orders found for this user" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "order fetched done", data: orders },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
