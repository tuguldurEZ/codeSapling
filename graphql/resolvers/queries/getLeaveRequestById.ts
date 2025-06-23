import { QueryResolvers } from "../../../generated/server-types";
import { leaveRequestModel } from "../../models/leaveRequest.model";

export const getLeaveRequestById: QueryResolvers["getLeaveRequestById"] =
  async (_, { id }) => {
    return await leaveRequestModel
      .findById(id)
      .populate("userId approver notifyTo");
  };
