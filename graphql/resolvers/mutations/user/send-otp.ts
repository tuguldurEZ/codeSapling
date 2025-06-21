import { sendEmail } from "../../../../utils/send-email";
import { userModel } from "../../../models/user.model";

export const sendOtp = async (_: unknown, { email }: { email: string }) => {
  const otpcode = Math.floor(1000 + Math.random() * 9000).toString();
  const user = userModel.findOneAndUpdate({ email }, { $set: { otpcode } });
  if (!user) {
    throw new Error("user not found");
  }
  await sendEmail({
    email,
    content: `<p>${otpcode}</p>`,
    tittle: "Your OTP code",
  });
  return user;
};
