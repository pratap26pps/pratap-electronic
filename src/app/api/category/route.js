import { NextResponse } from "next/server";
import Category from "@/models/category";
import connectDB from "@/dbconfig/dbconfig";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name,
      description,
    });
    console.log("category", category);
    return NextResponse.json(category, {
      status: 201,
      message: "category added successfully",
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

    const categories = await Category.find()

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
