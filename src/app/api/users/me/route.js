import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import connectDB from "@/dbconfig/dbconfig";
import { cookies } from "next/headers";
 

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    console.log("dekho wo agya token", token);
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decoded);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    console.log("body in me ", body);
    const cookieStore =await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
    });

    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
