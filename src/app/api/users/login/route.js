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

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const tokendata = {
      id: existingUser._id,
      email: existingUser.email,
      name:existingUser.firstname,
      role: existingUser.role,
    };

    const token = jwt.sign(tokendata, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful!", success: true ,token},
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
