import connectDB from "@/dbconfig/dbconfig";
import  Address  from "@/models/address";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    const userId = decoded.id;
    console.log("UserId:", userId);
    const newAddress = await Address.create(body);
     
    await User.findByIdAndUpdate(userId, {
      $push: { addresses: newAddress._id }
    });
    
    const updatedUser = await User.findById(userId).populate("addresses");
    
    console.log("updated user", updatedUser.addresses);
    return NextResponse.json(
      { success: true, address: newAddress },
      { status: 201 }
    );
  } catch (error) {
    console.error("Address creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
