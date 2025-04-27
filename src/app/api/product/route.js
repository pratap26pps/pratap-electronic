import { verifySeller } from "@/middleware";
import Product from "@/models/productDetails";
import { imageuploadcloudanary } from "@/utils/imageUpload";
import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import BrandProduct from "@/models/BrandProduct";
import Counter from "@/models/counter";
connectDB();


async function generateSKU() {
  const counter = await Counter.findOneAndUpdate(
    { name: "Product" },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return `PROD-${counter.count.toString().padStart(4, "0")}`; // like PROD-0005
}


export async function POST(req) {
  try {
    const user = await verifySeller(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    console.log("fomdata in serverr", formData);

    const ProductTitle = formData.get("ProductTitle");
    const ProductShortDescription = formData.get("ProductShortDescription");
    const ProductPrice = formData.get("ProductPrice");
    const productItems = formData.get("productItems");
    const BenefitsOfProduct = formData.get("BenefitsOfProduct");
    const ProductImage = formData.get("ProductImage");
    const LocalBrandId = formData.get("LocalBrandId");

    if (
      !ProductTitle ||
      !LocalBrandId ||
      !productItems ||
      !ProductImage ||
      !ProductShortDescription ||
      !ProductPrice ||
      !BenefitsOfProduct
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    console.log("ProductImage:", ProductImage);
    // Upload image to Cloudinary
    const thumbnailImage = await imageuploadcloudanary(
      ProductImage,
      "pankajphoto",
      500,
      80
    );
    console.log("thumbnailImage", thumbnailImage);
    // Create new product

    const sku = await generateSKU();

    const newProduct = await Product.create({
      ProductTitle,
      ProductPrice,
      productItems,
      ProductImage: thumbnailImage.secure_url,
      BenefitsOfProduct,
      ProductShortDescription,
      SKU: sku,
      brandcategory: LocalBrandId,
      isFeatured: true,
      views: 0,
      purchases: 0,
    });

    const updatedproduct = await BrandProduct.findByIdAndUpdate(
      LocalBrandId,
      {
        $push: {
          product: newProduct._id,
        },
      },
      { new: true }
    ).populate("product");

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      product: updatedproduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// **Get All Products
export async function GET(req) {
  try {
    const products = await Product.find({});
    // New Products (last 1 days)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 1);
    const newProducts = await Product.find({
      createdAt: { $gte: twoWeeksAgo },
    });

    // Featured
    const featuredProducts = await Product.find({ isFeatured: true });

    // Popular (sorted by views)
    const popularProducts = await Product.find({})
      .sort({ views: -1 })
      .limit(10);

    return NextResponse.json({
      success: true,
      products,
      newProducts,
      featuredProducts,
      popularProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//  Update Product
export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const ProductTitle = formData.get("ProductTitle");
    const ProductPrice = formData.get("ProductPrice");
    const ProductShortDescription = formData.get("ProductShortDescription");
    const BenefitsOfProduct = formData.get("BenefitsOfProduct");

    if (
      !id ||
      !ProductTitle ||
      !ProductPrice ||
      !ProductShortDescription ||
      !BenefitsOfProduct
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    let ProductImage = product.ProductImage;
    const file = formData.get("ProductImage");

    if (file && file.size > 0) {
      const ProductImageData = await imageuploadcloudanary(
        file,
        "pankajphoto",
        500,
        80
      );
      ProductImage = ProductImageData.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ProductTitle,
        ProductPrice,
        ProductShortDescription,
        BenefitsOfProduct,
        ProductImage,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete Product
export async function DELETE(req) {
  try {
    const user = await verifySeller(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
