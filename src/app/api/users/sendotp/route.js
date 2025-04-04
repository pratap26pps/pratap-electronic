import User from "@/models/userModel";
import otpGenerator from "otp-generator";
import OTP from "@/models/otp"; 
import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig"; 
export async function POST(req){
  
    await dbConnect();    
    try{
     const {email}=await req.json();
     console.log("email during send otp route",email);
    //  check user exits or not
    const usercheck =  await User.findOne({email});
    if (usercheck) {
        return NextResponse.json({
          success: false,
          message: "User already exists",
        }, { status: 409 });
      }
    // otp generate
    let otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
  
      let response = await OTP.findOne({ otp });
      while (response) {
        otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        response = await OTP.findOne({ otp });
      }
    
         // Save OTP
    const otpPayload = { email, otp };  
    const otpbody = await OTP.create(otpPayload);
    console.log("OTP stored in DB:", otpbody);
  
    return NextResponse.json({
        success: true,
        message: "OTP sent successfully",
        otp,
      }, { status: 200 });
      
    }
    catch(error){
        console.error("Backend error in sendotp route:", error);
        return NextResponse.json({
          success: false,
          message: error.message,
        }, { status: 500 });
      }
}