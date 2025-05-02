import connectDB from "@/dbconfig/dbconfig";
import Address from "@/models/address";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// ---------------- DELETE ----------------
export async function DELETE(req, { params }) {
  
    const { id } = await params;
  await connectDB();
  try {
    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    // Remove the address reference from the user
    await User.updateOne({ addresses: id }, { $pull: { addresses: id } });

    return NextResponse.json(
      { success: true, message: "Address deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete address error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ---------------- GET ----------------
export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;
  console.log("id", id);

  try {
    const address = await Address.findOne({_id:id});
    if (!address) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, address }, { status: 200 });
  } catch (error) {
    console.error("Get address error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ---------------- PUT ----------------
export async function PUT(req, { params }) {

    const { id } = await params;
  await connectDB();
  const body = await req.json();

  try {
    const updatedAddress = await Address.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedAddress) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, address: updatedAddress },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update address error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
