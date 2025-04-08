import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import Subcategory from "@/models/subCategory";

export async function POST(req,res) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, description, subcategoryid } = body;
   console.log("body",body)
    if (!name || !description || !subcategoryid) {
      return res.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
 
    const brandproduct = await BrandProduct.create({
      name,
      description,
      // product: [],
    });
console.log("brandproduct during route success",brandproduct);
    const updatebrandproduct = await Subcategory.findByIdAndUpdate(
      subcategoryid,
      {
        $push: {
          brandProduct: brandproduct._id,
        },
      },
      { new: true }
    ).populate("BrandProduct");

    return res.json( updatebrandproduct, {
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

export async function GET(res) {
  try {
    await connectDB();

    const categories = await BrandProduct.find().populate("product");
    return res.json(categories, { status: 200 });
  } catch (error) {
    return res.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
