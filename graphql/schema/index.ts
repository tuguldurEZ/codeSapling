import { mergeTypeDefs } from "@graphql-tools/merge";
import { queryTypeDefs } from "./schema";
import { userTypeDefs } from "./user.schema";
import { leaveTypeDefs } from "./leave-type.schema";
import { roleTypeDefs } from "./role.schema";
import { leaveRequestDefs } from "./LeaveRequest";

export const typeDefs = mergeTypeDefs([
  queryTypeDefs,
  userTypeDefs,
  leaveTypeDefs,
  roleTypeDefs,
  leaveRequestDefs,
]);
