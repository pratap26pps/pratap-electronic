import Order from "@/models/Order";
import connectDB from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const order = await Order.findById(id)
      .populate("products")
      .populate("selectedAddressId");

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Order fetched successfully", data: order },
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



export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleteorders = await Order.findByIdAndDelete(id)
    

    if (!deleteorders) {
      return NextResponse.json(
        { success: false, message: "delete order are not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "order fetched done", data: deleteorders },
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