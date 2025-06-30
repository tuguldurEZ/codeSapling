import { userModel } from "../../../models/user.model";

export const editRole = async (
  _: unknown,
  { _id, role }: { _id: string; role: string }
) => {
  await userModel.findByIdAndUpdate(_id, { role });
  return true;
};
