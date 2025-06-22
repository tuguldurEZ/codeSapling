import { EmployeeRoleModel } from "../../../models/employeeRole.model";

export const createRole = async (_: unknown, { role }: { role: string }) => {
  await EmployeeRoleModel.create({ role });
  return true;
};
