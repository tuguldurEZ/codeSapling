import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";

export const createLeaveRequest: MutationResolvers["createLeaveRequest"] =
  async (_, { input }) => {
    const created = await leaveRequestModel.create({
      userId: input.userId,
      startDate: input.startDate,
      endDate: input.endDate,
      reason: input.reason,
      file: input.file,
      approver: input.approver,
      notifyTo: input.notifyTo,
      LeaveType: input.LeaveType,
    });

    const populated = await leaveRequestModel
      .findById(created._id)
      .populate("userId approver notifyTo");

    return populated;
  };
