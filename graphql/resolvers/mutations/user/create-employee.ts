import { leaveTypeModel } from "../../../models/leaveType.model";
import { userModel } from "../../../models/user.model";

export const createEmployee = async (_: unknown, { input }: { input: any }) => {
  const leaveType = await leaveTypeModel.create({
    casualLeave: 72,
    paidLeave: 90,
    remoteWork: 108,
    annualLeave: 250,
  });

  const user = await userModel.create({
    email: input.email,
    role: input.role,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    employedDate: input.employedDate,
    employeeRole: input.employeeRole,
    leaveType: leaveType._id,
  });

  return user;
};
