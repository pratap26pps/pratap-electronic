import connectDB from "@/dbconfig/dbconfig";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  await connectDB();

  
  const { params } = context;
  const { id } = params;
  console.log("Deleting item with id:", id);

  try {
    const deletedItem = await Cart.findOneAndUpdate(
      { "items.productId": id },
      { $pull: { items: { productId: id } } },
      { new: true }
    );

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
        {
          success: true,
          message: "Item removed from cart",
        },
        { status: 200 }
      );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
