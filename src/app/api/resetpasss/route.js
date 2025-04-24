import { NextResponse } from "next/server";
import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
  const body = await req.json();
  console.log("Body received:", body);

    const { password, confirmpassword, token } = body;

    if (password !== confirmpassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const userDetails = await User.findOne({ 
      forgotpasswordToken: token,
      verifypasswordTokenExpiry: { $gt: Date.now() },
     });

    if (!userDetails) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { forgotpasswordToken: token },
      {
        password: hashedPassword,
        forgotpasswordToken: undefined,
        verifypasswordTokenExpiry: undefined,
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
