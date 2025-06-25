import { model, models, Schema } from "mongoose";
import { leaveTypeEnum, leaveTypeStatusEnum } from "../../utils/constants/enum";

const leaveRequestschema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(leaveTypeStatusEnum),
      default: leaveTypeStatusEnum.PENDING,
    },
    totalHours: { type: Number },
    reason: { type: String, required: true },
    file: { type: String },
    approver: { type: Schema.Types.ObjectId, ref: "User" },
    notifyTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    rejectionReason: { type: String },
    LeaveType: {
      type: String,
      enum: Object.values(leaveTypeEnum),
      required: true,
    },
  },
  { timestamps: true }
);
export const leaveRequestModel =
  models.leaveRequest || model("leaveRequest", leaveRequestschema);
