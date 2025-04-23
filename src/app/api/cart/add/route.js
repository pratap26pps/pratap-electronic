import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import Product from "@/models/productDetails";
import Cart from "@/models/cart";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    console.log("token during sku add",token)
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id;
    const body = await req.json();  
    const { sku, quantity } = body;

    if (!sku || typeof quantity !== "number") {
      return NextResponse.json(
        { message: "SKU and quantity are required" },
        { status: 400 }
      );
    }

    const product = await Product.findOne({ ProductTitle: sku });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: product._id, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product._id.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: product._id, quantity });
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
