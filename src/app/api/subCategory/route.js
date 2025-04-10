import { NextResponse } from "next/server";
import Subcategory from "@/models/subCategory";
import Category from "@/models/category";
import connectDB from "@/dbconfig/dbconfig";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("body", body);
    const { name, description, selectedCategoryId } = body;

    if (!name || !description || !selectedCategoryId) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const subcategory = await Subcategory.create({
      name,
      description,
      parentCategory: selectedCategoryId,
    });
    console.log("subcategory", subcategory);

    const updatecategory = await Category.findByIdAndUpdate(
      selectedCategoryId,
      {
        $push: {
          subcategory: subcategory._id,
        },
      },
      { new: true }
    ).populate("subcategory");

    return NextResponse.json(updatecategory, {
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

export async function GET(req) {
  try {
    await connectDB();
    const categoryId = req.nextUrl.searchParams.get("categoryId");

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const category = await Category.findById(categoryId)
      .populate("subcategory")
      .exec();

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category.subcategory, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}
