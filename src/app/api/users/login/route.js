import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;

    console.log("Received Email:", email);
    console.log("Received Password:", password);

    if (!email || !password) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User Account is not Registered" },
        { status: 404 }
      );
    }

    const verifypassword = await bcrypt.compare(password, existingUser.password);
    if (!verifypassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT
    const tokendata = {
      id: existingUser._id,
      firstname: existingUser.firstname,
      email: existingUser.email
    };

    const token = jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set the cookie properly
    const res = NextResponse.json(
      { message: "Login successful!", success: true },
      { status: 200 }
    );
    res.cookies.set("token", token, { httpOnly: true });

    return res;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
