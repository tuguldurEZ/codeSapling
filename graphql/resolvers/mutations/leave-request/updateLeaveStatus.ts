import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";

export const updateLeaveStatus: MutationResolvers["updateLeaveStatus"] = async (
  _,
  { id, status, rejectionReason }
) => {
  const updated = await leaveRequestModel
    .findByIdAndUpdate(
      id,
      {
        status,
        rejectionReason: status === "REJECTED" ? rejectionReason : null,
      },
      { new: true }
    )
    .populate("userId approver notifyTo");

  if (!updated) throw new Error("Leave request not found");
  return updated;
};
