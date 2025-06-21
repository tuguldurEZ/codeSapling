import { userModel } from "../../../models/user.model";

export const createEmployee = async (_: unknown, { input }: { input: any }) => {
  const user = userModel.create({
    email: input.email,
    role: input.role,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    employedDate: input.employedDate,
  });
  return user;
};
