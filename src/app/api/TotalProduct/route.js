import { NextResponse } from 'next/server';
import connectDB from '@/dbconfig/dbconfig';
  
import Category from '@/models/category';
import BrandProduct from '@/models/BrandProduct';
import Subcategory from '@/models/subCategory';
import Product from '@/models/productDetails';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().lean();

    const fullData = await Promise.all(categories.map(async (cat) => {
      const subcategories = await Subcategory.find({ category: cat._id }).lean();

      const subcatWithBrands = await Promise.all(subcategories.map(async (subcat) => {
        const brands = await BrandProduct.find({ subcategory: subcat._id })
          .populate("product") // populate all products inside brand
          .lean();

        return {
          ...subcat,
          brands
        };
      }));
 
      return {
        ...cat,
        subcategories: subcatWithBrands
      };
    }));

    return NextResponse.json({ success: true, data: fullData });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
