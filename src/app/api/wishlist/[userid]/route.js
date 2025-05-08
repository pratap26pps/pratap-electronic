import connectDB from "@/dbconfig/dbconfig";
import Wishlist from "@/models/wishlist";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const userId = segments[segments.length - 1]; // safely get the ID

    console.log("userid for wishlist", userId);

    const wishlist = await Wishlist.findOne({ userId }).populate("items.productId");

    if (!wishlist) {
      return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });
    }

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}
