import jwt from "jsonwebtoken";
import { userModel } from "../../../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret";

export const verifyOtp = async (
  _: unknown,
  { email, otp }: { email: string; otp: number }
) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // 🔓 Skip OTP check entirely (dev purpose only)
  // ⚠️ Never use this in production
  // if (user.otpcode !== otp) {
  //   throw new Error("Invalid OTP");
  // }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  user.otpcode = undefined;
  await user.save();

  return {
    message: "OTP verification skipped (dev mode)",
    token,
    role: user.role,
  };
};
