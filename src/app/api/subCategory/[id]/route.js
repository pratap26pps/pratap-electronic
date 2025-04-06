import { NextResponse } from 'next/server';
import connectDB from '@/dbconfig/dbconfig';
import Subcategory from '@/models/subCategory';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const category = await Subcategory.findById(id).populate('BrandProduct');

    if (!category) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching Subcategory' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { name, description } = await req.json();

    const updated = await Subcategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating Subcategory' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Subcategory.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subcategory deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting Subcategory' }, { status: 500 });
  }
}
