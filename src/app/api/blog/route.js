import connectDB from "@/dbconfig/dbconfig";
import { News } from "@/models/News";
import { NextResponse } from "next/server";

// CREATE News - POST request
export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();

    const newsPost = await News.create(body);

    return NextResponse.json(newsPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating news", error: error.message }, { status: 500 });
  }
}

// GET all News - GET request
export async function GET() {
  await connectDB();
  try {
    const newsList = await News.find().sort({ createdAt: -1 });

    return NextResponse.json(newsList, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching news", error: error.message }, { status: 500 });
  }
}
