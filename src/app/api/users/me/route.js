import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import connectDB from "@/dbconfig/dbconfig";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;  
    console.log("dekho wo agya",token);
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode",decoded);
    return NextResponse.json({ user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
 

export   async function PUT(req, res) {
  await connectDB();  

  try {
 

    const { firstName, lastName, phone, email } = req.body;

   
    const user = await User.findOne(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;

    await user.save();  

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
