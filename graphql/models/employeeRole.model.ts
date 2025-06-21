import { model, models, Schema } from "mongoose";

const employeeRoleSchema = new Schema(
  {
    role: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);
export const EmployeeRoleModel =
  models.EmployeeRole || model("EmployeeRole", employeeRoleSchema);
