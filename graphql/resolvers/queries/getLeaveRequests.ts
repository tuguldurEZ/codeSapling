import { QueryResolvers } from "../../../generated/server-types";
import { leaveRequestModel } from "../../models/leaveRequest.model";

export const getLeaveRequests: QueryResolvers["getLeaveRequests"] =
  async () => {
    const requests = await leaveRequestModel.find().populate("userId");

    return requests.filter((request) => request.userId !== null);
  };
