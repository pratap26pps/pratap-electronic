import Product from "@/models/productDetails";
import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";

connectDB();

export async function GET(req, context) {
  try {
    console.log("Full context object:", context);

    const params = await context.params;
    const id = params?.id;

    console.log("Extracted ID:", id); 

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }

    const getoneProduct = await Product.findById(id);

    if (!getoneProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Product retrieved successfully",
      data: getoneProduct,
    });

  } catch (error) {
    console.error("Error getting product:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
