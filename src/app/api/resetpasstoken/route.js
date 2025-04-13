import connectDB from "@/dbconfig/dbconfig";
 
import User from "@/models/userModel";
import mailSender from "@/utils/mailSender";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your email is not registered with us",
      });
    }

    const token = crypto.randomUUID();
    const userDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        passwordExpireIn: Date.now() + 5 * 60 * 1000, // 5 minutes
      },
      { new: true }
    );

    const url = `http://localhost:3000/Account/updatepassword/${token}`;
    await mailSender(email, "Password Reset Link", `Click to reset your password: ${url}`);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully, check your inbox",
      userDetails,
    });
  } catch (error) {
    console.error("Reset password token error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Reset password failed",
    });
  }
}
