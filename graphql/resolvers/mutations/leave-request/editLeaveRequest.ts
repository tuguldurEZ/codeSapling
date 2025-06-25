import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";

export const editLeaveRequest: MutationResolvers["editLeaveRequest"] = async (
  _,
  { id, input }
) => {
  const updated = await leaveRequestModel
    .findByIdAndUpdate(
      id,
      {
        startDate: input.startDate,
        endDate: input.endDate,
        reason: input.reason,
        file: input.file,
        approver: input.approver,
        notifyTo: input.notifyTo,
        LeaveType: input.LeaveType,
      },
      { new: true }
    )
    .populate("userId");
  if (!updated) throw new Error("Leave request not found");
  return updated;
};
