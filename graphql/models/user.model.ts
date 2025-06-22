import { model, models, Schema } from "mongoose";
import { userRoleEnum } from "../../utils/constants/enum";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(userRoleEnum),
      default: userRoleEnum.USER,
    },
    otpcode: { type: Number },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    employedDate: { type: Date, required: true },
    phone: { type: Number, required: true },
    leaveType: { type: Schema.Types.ObjectId, ref: "leaveType" },
    employeeRole: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const userModel = models.User || model("User", userSchema);
