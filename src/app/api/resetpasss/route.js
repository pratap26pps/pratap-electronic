import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { password, confirmpassword, token } = await req.json();

    if (password !== confirmpassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const userDetails = await User.findOne({ token });

    if (!userDetails) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    if (userDetails.passwordExpireIn < Date.now()) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        passwordExpireIn: undefined,
      },
      { new: true }
    );

    return NextResponse.json(
      { success: true, message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error.message);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
