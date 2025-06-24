import jwt from "jsonwebtoken";
import { userModel } from "../../../models/user.model";

export const getCurrentUser = async (_: unknown, { JWT }: { JWT: string }) => {
  const decoded = jwt.verify(JWT, process.env.JWT_SECRET as string) as {
    userId: string;
  };

  const user = await userModel.findById(decoded.userId);
  return user;
};
