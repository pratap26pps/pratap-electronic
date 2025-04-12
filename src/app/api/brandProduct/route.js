import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import Subcategory from "@/models/subCategory";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description, SubCategoryId } = body;

    console.log("body", body);

    if (!name || !description || !SubCategoryId) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const brandproduct = await BrandProduct.create({
      name,
      description,
      subcategory: SubCategoryId,
    });

    console.log("brandproduct during route success", brandproduct);

    const updatebrandproduct = await Subcategory.findByIdAndUpdate(
      SubCategoryId,
      {
        $push: {
          brandProduct: brandproduct._id,
        },
      },
      { new: true }
    ).populate("brandProduct"); 

    return NextResponse.json(
      {
        message: "BrandProduct added successfully",
        data: updatebrandproduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    await connectDB();

    const subcategoryId = req.nextUrl.searchParams.get("subcategoryId");
   
        if (!subcategoryId) {
          return NextResponse.json(
            { error: "Category ID is required" },
            { status: 400 }
          );
        }
 
        const subcatDetails = await Subcategory.findById(subcategoryId)
        .populate({
          path:"brandProduct",
          populate:{
            path:"product",
          }
        })
        .exec();
  
      if (!subcatDetails) {
        return NextResponse.json(
          { error: "subcatDetails not found" },
          { status: 404 }
        );
      }
  
    return NextResponse.json(subcatDetails.brandProduct,subcatDetails.brandProduct.product,
       { status: 200 });
 
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand products" },
      { status: 500 }
    );
  }
}
