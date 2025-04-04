import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
connectDB(); // Ensure database connection

export async function POST(req) {
  try {
    // Parse request bodya
    const reqBody = await req.json();
    const { firstname, lastname, email, password, confirmpassword, phonenumber, state, country, city } = reqBody;
 
    // Validate required fields
    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    const existingOwner = await User.findOne({ role: "owner" });

   
    const role = existingOwner ? "customer" : "owner";
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phonenumber,
      role,
      state,
      country,
      city,
    });

    await newUser.save();

 
    // cookies().set("role", newUser.role, { httpOnly: true, secure: true });

    return NextResponse.json(
      { message: "User registered successfully!" },
       { status: 201 },
       newUser,
      );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
