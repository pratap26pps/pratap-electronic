import connectDB from "@/dbconfig/dbconfig";
import { News } from "@/models/News";
import { NextResponse } from "next/server";
 

// GET all News - GET request
export async function GET(req, { params }) {
  await connectDB();
  try {
    const {id} = params;
    const newsItem = await News.findById(id) 
    if (!newsItem) {
        return NextResponse.json({ message: "News not found" }, { status: 404 });
      }
    return NextResponse.json(newsItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching news", error: error.message }, { status: 500 });
  }
}

// GET all News - GET request
export async function DELETE(req, { params }) {
    await connectDB();
    try {
      const {id} = params;
      const newsItem = await News.findByIdAndDelete(id) 
      if (!newsItem) {
          return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
      return NextResponse.json(newsItem, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching news", error: error.message }, { status: 500 });
    }
  }
