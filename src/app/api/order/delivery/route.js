import Product from "@/models/productDetails";
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

        // Fetch order with products
        const order = await Order.findById(orderId).populate("products.productId");

        if (!order) {
          return Response.json(
            { success: false, message: "Order not found" },
            { status: 404 }
          );
        }
        if (order.status === "Delivered Successfully") {
          return Response.json(
            { success: false, message: "Order already Delivered" },
            { status: 400 }
          );
        }
    // Restore stock quantities
    for (const item of order.products) {
      const productId = item.productId._id;
      const quantity = item.quantity;

      await Product.findByIdAndUpdate(
        productId,
        { $inc: { productItems: quantity } },
        { new: true }
      );
    }

    // Update order status to Cancelled
    order.status = "Delivered Successfully";
    await order.save();

    return Response.json(
      { success: true, message: "Order Delivered Successfully", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delivere Order Error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
