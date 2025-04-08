import { NextResponse } from "next/server";
import Subcategory from "@/models/subCategory";
import Category from "@/models/category";
import connectDB from "@/dbconfig/dbconfig";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("body",body)
    const { name, description, categoryid } = body;
    console.log("abhishek",name)

    if (!name || !description || !categoryid) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const subcategory = await Subcategory.create({
      name,
      description,
      category: categoryid
       
    });
    console.log("subcategory",subcategory)

    const updatecategory = await Category.findByIdAndUpdate(
      categoryid,
      {
        $push: {
          subcategory: subcategory._id,
        },
      },
      { new: true }
    ).populate("subcategory");

    return NextResponse.json(
      updatecategory, {
      status: 201,
      message: "Subcategory added successfully",
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

    const subcategories = await Subcategory.find().populate("BrandProduct").populate("category");;
    return NextResponse.json(subcategories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}
