import { userModel } from "../../../models/user.model";

export const getUsers = async () => {
  const users = await userModel.find({});
  if (!users) {
    throw new Error("users not found");
  }
  return users;
};
