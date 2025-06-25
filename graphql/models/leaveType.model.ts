import { model, models, Schema } from "mongoose";

const leaveTypeSchema = new Schema({
  casualLeave: { type: Number, default: 72 },
  paidLeave: { type: Number, default: 90 },
  annualLeave: { type: Number, default: 108 },
  remoteWork: { type: Number, default: 250 },
});
export const leaveTypeModel =
  models.leaveType || model("leaveType", leaveTypeSchema);
