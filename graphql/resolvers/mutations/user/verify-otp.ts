import { userModel } from "../../../models/user.model";

export const verifyOtp = async (
  _: unknown,
  { email, otp }: { email: string; otp: number }
) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("user not found");
  }
  if (user.otpcode === otp) {
    return true;
  }
  return false;
};
