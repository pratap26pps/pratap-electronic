import { NextResponse } from 'next/server';
import connectDB from '@/dbconfig/dbconfig';
  
import Category from '@/models/category';
import BrandProduct from '@/models/BrandProduct';
import Subcategory from '@/models/subCategory';
import Product from '@/models/productDetails';

export async function GET() {
  
  try {
    await connectDB();
    const categories = await Category.find().populate({
     path:"subcategory",
      populate:{
        path:"brandProduct",
        populate:{
          path:"product",
        }
      }
    });
 
 

    return NextResponse.json({ success: true, data:categories });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
