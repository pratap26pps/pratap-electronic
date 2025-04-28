
import connectDB from "@/dbconfig/dbconfig";
import Product from "@/models/productDetails";
import BrandProduct from "@/models/BrandProduct";
import Subcategory from "@/models/subCategory";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params; 

    // Step 1: Find all SubCategories for this Category
    const subCategories = await Subcategory.find({ parentCategory: id }).select("_id");

    const subCategoryIds = subCategories.map((subCat) => subCat._id);

    // Step 2: Find all Brands for these SubCategories
    const brands = await BrandProduct.find({ subcategory : { $in: subCategoryIds } }).select("_id");

    const brandIds = brands.map((brand) => brand._id);

    // Step 3: Find all Products for these Brands
    const products = await Product.find({ brandcategory: { $in: brandIds } });

    return Response.json({ success: true, products });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: "Failed to fetch products" }), { status: 500 });
  }
}
