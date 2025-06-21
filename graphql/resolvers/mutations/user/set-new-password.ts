import { userModel } from "../../../models/user.model";
import bcrypt from "bcryptjs";

export const setNewPassword = async (
  _: unknown,
  { email, newPassword }: { email: string; newPassword: string }
) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await userModel.findOneAndUpdate(
    { email },
    {
      $set: { password: hashedPassword },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return "Password updated successfully";
};
