import { leaveTypeModel } from "../../models/leaveType.model";

export const leaveRequirement = async (
  _: unknown,
  { input }: { input: any }
) => {
  const leaveRequirement = await leaveTypeModel.create({
    casualLeave: input.casualLeave,
    paidLeave: input.paidLeave,
    remoteWork: input.remoteWork,
    annualLeave: input.annualLeave,
  });
  return leaveRequirement;
};
