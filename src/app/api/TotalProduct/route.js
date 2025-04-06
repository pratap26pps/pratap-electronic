import { NextResponse } from 'next/server';
import connectDB from '@/dbconfig/dbconfig';
 import Allproduct from '@/models/allProduct';

export async function GET() {
  try {
    await connectDB();

    const allProducts = await Allproduct.find()
      .populate('productcontent')    
      .populate('ratingreview')     
      .populate('customerPurchased'); 

    return NextResponse.json(allProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
