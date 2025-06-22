import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";

export const createLeaveRequest: MutationResolvers["createLeaveRequest"] =
  async (_: unknown, { input }) => {
    const leaveRequest = await leaveRequestModel.create({
      userId: input.userId,
      startDate: input.startDate,
      endDate: input.endDate,
      reason: input.reason,
      approver: input.approver,
      notifyTo: input.notifyTo,
      LeaveType: input.LeaveType,
    });
    return leaveRequest;
  };
