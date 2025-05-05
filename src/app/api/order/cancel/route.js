
import connectDB from "@/dbconfig/dbconfig";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return Response.json(
        { success: false, message: "Order ID required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "Cancelled" },
      { new: true }
    );

    if (!updatedOrder) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Order cancelled", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
