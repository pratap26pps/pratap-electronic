import connectDB from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { password, confirmpassword, token } = req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userDetails = await User.findOne({ token });
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (userDetails.passwordExpireIn < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token has expired, please regenerate",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ token }, { password: hashedPassword }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during password reset",
    });
  }
}
