import { NextResponse } from 'next/server';
import connectDB from '@/dbconfig/dbconfig';
import BrandProduct from '@/models/BrandProduct';

export async function GET(req, { params }) {
  try {
    await connectDB();
    // const { id } = params;
    const category = await BrandProduct.find().populate('product');

    if (!category) {
      return NextResponse.json({ error: 'BrandProduct not found' }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching BrandProduct' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { name, description } = await req.json();

    const updated = await BrandProduct.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'BrandProduct not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating BrandProduct' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await BrandProduct.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'BrandProductnot found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'BrandProduct deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting BrandProduct' }, { status: 500 });
  }
}
