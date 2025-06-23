import { QueryResolvers } from "../../../generated/server-types";
import { leaveRequestModel } from "../../models/leaveRequest.model";

export const getLeaveRequests: QueryResolvers["getLeaveRequests"] =
  async () => {
    return await leaveRequestModel.find().populate("userId approver notifyTo");
  };
