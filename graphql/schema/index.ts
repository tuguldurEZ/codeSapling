import { mergeTypeDefs } from "@graphql-tools/merge";
import { queryTypeDefs } from "./schema";
import { userTypeDefs } from "./user.schema";

export const typeDefs = mergeTypeDefs([queryTypeDefs, userTypeDefs]);
