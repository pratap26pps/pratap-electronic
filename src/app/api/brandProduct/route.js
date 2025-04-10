import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import Subcategory from "@/models/subCategory";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description, subcategoryid } = body;

    console.log("body", body);

    if (!name || !description || !subcategoryid) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const brandproduct = await BrandProduct.create({
      name,
      description,
      subcategory: subcategoryid,
    });

    console.log("brandproduct during route success", brandproduct);

    const updatebrandproduct = await Subcategory.findByIdAndUpdate(
      subcategoryid,
      {
        $push: {
          brandProduct: brandproduct._id,
        },
      },
      { new: true }
    ).populate("brandProduct"); // Make sure field name matches your model

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

// export async function GET() {
//   try {
//     await connectDB();
//     const categories = await BrandProduct.find();
//     return NextResponse.json(categories, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch categories" },
//       { status: 500 }
//     );
//   }
// }
export async function GET(req) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const subcategoryId = searchParams.get("subcategoryId");

    let brandProducts;

    if (subcategoryId) {
      // Get Subcategory with populated brandProducts
      brandProducts = await Subcategory.findById(subcategoryId)
        .populate("brandProduct")
        .exec();
    } else {
      // Get all BrandProducts if no subcategoryId specified
      brandProducts = await BrandProduct.find();
    }

    return NextResponse.json(brandProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching brand products:", error);
    return NextResponse.json(
      { error: "Failed to fetch brand products" },
      { status: 500 }
    );
  }
}
