import connectDB from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server"; 
import User from "@/models/userModel";
import {mailSender} from "@/utils/mailSender";
import crypto from "crypto";

export async function POST(req,) {
 
  try {
    await connectDB();

    const { email } =await req.json()
    console.log("email",email);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Your email is not registered with us",
      },{status:401});
    }

    const token = crypto.randomUUID();
    const userDetails = await User.findOneAndUpdate(
      { email },
      {
        forgotpasswordToken: token,
        verifypasswordTokenExpiry: Date.now() + 5 * 60 * 1000, // 5 minutes
      },
      { new: true }
    );
    // for locally run 
    // const url = `http://localhost:3000/Account/updatepassword/${token}`;
    
    // for vercel run or in production 
    const url = `https://embproto.vercel.app/Account/updatepassword/${token}`;

    await mailSender(email, "Password Reset Link", `Click to reset your password: ${url}`);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully, check your inbox",
      userDetails,
    },  { status: 200 });
  } catch (error) {
    console.error("Reset password token error:", error.message);
    return NextResponse.json({
      success: false,
      message: "Reset password failed",
    }, { status: 500 });
  }
}
