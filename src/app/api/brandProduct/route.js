import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import Subcategory from "@/models/subCategory";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description, subcategoryid } = body;

    if (!name || !description || !subcategoryid) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    const subcategorydetails = await Subcategory.findById({
      _id: subcategoryid,
    });
    if (!subcategorydetails) {
      return NextResponse.json(
        { error: "subcategorydetails are required." },
        { status: 400 }
      );
    }
    const brandproduct = await BrandProduct.create({
      name,
      description,
      subcategorydetails,
    });

    const updatebrandproduct = await Subcategory.findByIdAndUpdate(
      { _id: subcategoryid },
      {
        $push: {
          brandproduct: brandproduct._id,
        },
      },
      { new: true }
    ).populate("brandproduct");

    return NextResponse.json(brandproduct, updatebrandproduct, {
      status: 201,
      message: "BrandProduct added successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const categories = await BrandProduct.find().populate("Product");
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
