import { MutationResolvers } from "../../../../generated/server-types";
import { leaveRequestModel } from "../../../models/leaveRequest.model";

export const deleteLeaveRequest: MutationResolvers["deleteLeaveRequest"] =
  async (_, { id }) => {
    const deleted = await leaveRequestModel.findByIdAndDelete(id);
    return !!deleted;
  };
