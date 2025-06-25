import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";
import { userModel } from "../../../models/user.model";
import { leaveTypeModel } from "../../../models/leaveType.model";

export const updateLeaveStatus: MutationResolvers["updateLeaveStatus"] = async (
  _,
  { id, status, rejectionReason }
) => {
  const updatedRequest = await leaveRequestModel
    .findByIdAndUpdate(
      id,
      {
        status,
        rejectionReason: status === "REJECTED" ? rejectionReason : null,
      },
      { new: true }
    )
    .populate({
      path: "userId",
      populate: { path: "leaveType" },
    })
    .populate("approver notifyTo");

  if (!updatedRequest) throw new Error("Leave request not found");

  if (status === "APPROVED") {
    const user = updatedRequest.userId as any;

    if (!user || !user.leaveType) {
      throw new Error("User or user's leaveType record not found");
    }

    const leaveTypeRecord = user.leaveType;
    const leaveField = updatedRequest.LeaveType;
    const totalHours = updatedRequest.totalHours;

    if (typeof leaveTypeRecord[leaveField] !== "number") {
      throw new Error(`Invalid leave type: ${leaveField}`);
    }

    leaveTypeRecord[leaveField] -= totalHours;
    await leaveTypeRecord.save();
  }

  return updatedRequest;
};
