import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/dbconfig/dbconfig";
import Cart from "@/models/cart";
import toast from "react-hot-toast";

export async function GET(req) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    return NextResponse.json(cart || { userId, items: [] });
  } catch (error) {
    console.error("Cart GET error:", error);
    return NextResponse.json(
      { message: "Invalid token or session expired" },
      { status: 401 }
    );
  }
}

export async function PUT(req) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const body = await req.json();
    const { items } = body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items });
    } else {
      cart.items = items;
      await cart.save();
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart PUT error:", error);
    return NextResponse.json(
      { message: "Invalid token or session expired" },
      { status: 401 }
    );
  }
}
