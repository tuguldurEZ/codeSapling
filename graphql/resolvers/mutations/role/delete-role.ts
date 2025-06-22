import { EmployeeRoleModel } from "../../../models/employeeRole.model";

export const deleteRole = async (_: unknown, { _id }: { _id: string }) => {
  await EmployeeRoleModel.findByIdAndDelete(_id);
  return true;
};
