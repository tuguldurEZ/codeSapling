import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";

export const createLeaveRequest: MutationResolvers["createLeaveRequest"] =
  async (_, { input }) => {
    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const dayInMs = 1000 * 60 * 60 * 24;
    const diffInMs = endDate.getTime() - startDate.getTime();
    const dayCount = Math.floor(diffInMs / dayInMs) + 1;

    const totalHours = dayCount * 9;

    const created = await leaveRequestModel.create({
      userId: input.userId,
      startDate,
      endDate,
      reason: input.reason,
      file: input.file,
      approver: input.approver,
      notifyTo: input.notifyTo,
      LeaveType: input.LeaveType,
      totalHours,
    });

    const populated = await leaveRequestModel
      .findById(created._id)
      .populate("userId");

    return populated;
  };
