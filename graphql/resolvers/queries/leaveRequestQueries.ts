// import { leaveRequestModel } from "../../models/leaveRequest.model.js";
// import { QueryResolvers } from "../../../generated/server-types";

// export const leaveResolvers: {
//   Query: QueryResolvers;
// } = {
//   Query: {
//     getLeaveRequests: async () => {
//       return await leaveRequestModel
//         .find()
//         .populate("userId approver notifyTo");
//     },

//     getLeaveRequestById: async (_, { id }) => {
//       return await leaveRequestModel
//         .findById(id)
//         .populate("userId approver notifyTo");
//     },

//     getLeaveRequestsByUser: async (_, { userId }) => {
//       return await leaveRequestModel
//         .find({ userId })
//         .populate("userId approver notifyTo");
//     },
//   },
// };
