import Order from "@/models/Order";
import connectDB from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const orders = await Order.find({_id:id})
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