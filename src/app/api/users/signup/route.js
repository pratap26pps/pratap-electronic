import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Address from "@/models/address";
connectDB(); // Ensure database connection

export async function POST(req) {
  try {
    // Parse request bodya
    const reqBody = await req.json();
    const { firstname, lastname, email, password, confirmpassword,gstno} = reqBody;
 
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
      role,
      gstno
    });

    await newUser.save();

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

export async function GET(req) {
  try {
 
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
   const existingUser = await User.findOne({ email }).populate("addresses");
   console.log("Populated addresses:", existingUser.addresses);
    if (!existingUser) {
      return NextResponse.json({ error: "User not exists." }, { status: 400 });
    }
 
    return NextResponse.json({ user: existingUser }, { status: 200 });
  } catch (error) {
    console.error("get Signup data Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}