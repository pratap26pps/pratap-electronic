import crypto from "crypto";
import Product from "@/models/productDetails";
import User from "@/models/userModel";
import mailsender from "@/utils/mailSender";
import { productEnrollment } from "@/app/templete/productenrollmail";

import connectDB from "@/dbconfig/dbconfig";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });

  await connectDB();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    product,
    productId,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !product ||
    !productId
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Payment verification failed: missing fields",
      });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrollStudent(product, productId, res);
    return res
      .status(200)
      .json({ success: true, message: "Payment verified and enrollment done" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Signature mismatch" });
  }
}

async function enrollStudent(product, userId, res) {
  try {
    for (const productId of product) {
      const items = await Product.findByIdAndUpdate(
        productId,
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!items)
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });

      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: productId } },
        { new: true }
      );

      await mailsender(
        user.email,
        `Successfully enrolled into ${items.ProductName}`,
        productEnrollment(items.ProductName, user.firstname)
      );
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
