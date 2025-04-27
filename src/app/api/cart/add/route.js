import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import Product from "@/models/productDetails";
import Cart from "@/models/cart";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();  
    const { sku, quantity ,userId} = body;

    if (!sku || typeof quantity !== "number") {
      return NextResponse.json(
        { message: "SKU and quantity are required" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({ SKU: sku });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId: userId,
        items: [{ productId: product._id, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === product._id.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: product._id, quantity });
      }

      await cart.save();
    }

    return NextResponse.json(
      { message: "Product added to cart successfully", cart },
      { status: 200 }
    );
  } catch (err) {
    console.error("Add to cart error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
