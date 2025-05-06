import crypto from "crypto";
import Product from "@/models/productDetails";
import User from "@/models/userModel";
import { mailSender } from "@/utils/mailSender";
import { productEnrollment } from "@/app/templete/productenrollmail";
import connectDB from "@/dbconfig/dbconfig";
import Order from "@/models/Order";
// Enroll the student into the product
async function enrollCustomer(
  product,
  userId,
  grandTotal,
  gstRate,
  shipping,
  subtotal,
  discount,
  selectedAddressId,


) {
  try {
    const productDocs = [];
    for (const item of product) {
      const { productId, quantity } = item;

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $push: { CustomerId: userId } },
        { new: true }
      );

      if (!updatedProduct) throw new Error("Product not found");
      // Add the product to the user's courses
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: productId } },
        { new: true }
      );

      // Send an enrollment confirmation email
      await mailSender(
        user.email,
        `Successfully purchased ${updatedProduct.ProductName}`,
        productEnrollment(updatedProduct.ProductName, user.firstname)
      );

      productDocs.push({
        productId: updatedProduct._id,
        quantity: quantity || 1, 
      });
    }

  
    // After enrolling in products, create an Order
    const newOrder = await Order.create({
      user: userId,
      products: productDocs,
      paymentMethod: "Online",
      status: "Processing",
      subtotal,
      shipping,
      gstRate,
      discount,
      selectedAddressId,
      grandTotal,

    });
    return newOrder;
  } catch (error) {
    throw new Error(error.message || "An error occurred while enrolling");
  }
}

export async function POST(req) {
  // Connecting to the database
  await connectDB();

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    product,
    userId,
    grandTotal,
    gstRate,
    shipping,
    subtotal,
    discount,
    selectedAddressId,

  } = await req.json();

  // Check for missing fields
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !product ||
    !userId
  ) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Payment verification failed: missing fields",
      }),
      { status: 400 }
    );
  }

  // Create the expected signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  // Verify signature and process enrollment
  if (expectedSignature === razorpay_signature) {
    await enrollCustomer(
      product,
      userId,
      grandTotal,
      gstRate,
      shipping,
      subtotal,
      discount,
      selectedAddressId,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified done Successfullly",
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Signature mismatch",
      }),
      { status: 400 }
    );
  }
}
