import { QueryResolvers } from "../../../generated/server-types";
import { leaveRequestModel } from "../../models/leaveRequest.model";

export const getLeaveRequestsByUser: QueryResolvers["getLeaveRequestsByUser"] =
  async (_: unknown, { userId }) => {
    return await leaveRequestModel
      .find({ userId })
      .populate("userId approver notifyTo");
  };
