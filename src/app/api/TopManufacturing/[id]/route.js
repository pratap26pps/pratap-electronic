

import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectDB();

    const brand = await BrandProduct.findById(id);
    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    await BrandProduct.findByIdAndDelete(id);

    return NextResponse.json({ message: "Brand deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting brand:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
