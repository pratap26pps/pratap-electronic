import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import { NextResponse } from "next/server";





export async function GET(req) {
  try {
    await connectDB();

    const brandId = req.nextUrl.searchParams.get("brandId");
   
        if (!brandId) {
          return NextResponse.json(
            { error: "Category ID is required" },
            { status: 400 }
          );
        }
 
        const productDetails = await BrandProduct.findById(brandId)
        .populate("product")
        .exec();
  
      if (!productDetails) {
        return NextResponse.json(
          { error: "productDetails not found" },
          { status: 404 }
        );
      }
  
    return NextResponse.json(productDetails.product, { status: 200 });
 
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand products" },
      { status: 500 }
    );
  }
}