import { EmployeeRoleModel } from "../../../models/employeeRole.model";

export const editRole = async (
  _: unknown,
  { role, _id }: { role: string; _id: string }
) => {
  const employeeRole = await EmployeeRoleModel.findByIdAndUpdate(_id, { role });
  if (!employeeRole) {
    throw new Error("role not found");
  }
  return true;
};
