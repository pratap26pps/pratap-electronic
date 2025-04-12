
import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await connectDB();
    const categories = await BrandProduct.find().populate("product");
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}