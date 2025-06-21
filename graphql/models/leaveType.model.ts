import { model, models, Schema } from "mongoose";

const leaveTypeSchema = new Schema({
  casualLeave: { type: Number },
  paidLeave: { type: Number },
  annualLeave: { type: Number },
});
export const leaveTypeModel =
  models.leaveType || model("leaveType", leaveTypeSchema);
