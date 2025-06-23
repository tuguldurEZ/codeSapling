import { model, models, Schema } from "mongoose";

const leaveTypeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

  casualLeave: { type: Number },
  paidLeave: { type: Number },
  annualLeave: { type: Number },
  remoteWork: { type: Number },

  lastMonthlyRefresh: { type: Date },
  lastAnnualRefresh: { type: Date },
});

export const leaveTypeModel =
  models.leaveType || model("leaveType", leaveTypeSchema);
