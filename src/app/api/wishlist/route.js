import connectDB from "@/dbconfig/dbconfig";
import Wishlist from "@/models/wishlist";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectDB();
      const { userId, productId } = await req.json();
  
      let wishlist = await Wishlist.findOne({ userId });
  
      const isWishlist = wishlist?.items.some(
        (item) => item.productId.toString() === productId
      );
  
      if (isWishlist) {
        return NextResponse.json(
          { message: "Product already in wishlist" },
          { status: 409 }
        );
      }
  
      if (!wishlist) {
        wishlist = await Wishlist.create({
          userId,
          items: [{ productId }],
        });
      } else {
        wishlist.items.push({ productId });
        await wishlist.save();
      }
  
      return NextResponse.json(
        { message: "Added to wishlist", wishlist },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return NextResponse.json(
        { error: "Failed to add to wishlist" },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(req) {
    try {
      await connectDB();
  
      const { userId, productId } = await req.json();
  
      if (!userId || !productId) {
        return NextResponse.json(
          { message: "userId and productId are required" },
          { status: 400 }
        );
      }
  
      const wishlist = await Wishlist.findOne({ userId });
  
      if (!wishlist) {
        return NextResponse.json(
          { message: "Wishlist not found" },
          { status: 404 }
        );
      }
  
      const originalLength = wishlist.items.length;
  
      wishlist.items = wishlist.items.filter(
        (item) => item.productId.toString() !== productId
      );
  
      if (wishlist.items.length === originalLength) {
        return NextResponse.json(
          { message: "Product not found in wishlist" },
          { status: 404 }
        );
      }
  
      await wishlist.save();
  
      return NextResponse.json(
        { message: "Product removed from wishlist", wishlist },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      return NextResponse.json(
        { error: "Failed to remove from wishlist" },
        { status: 500 }
      );
    }
  }
  