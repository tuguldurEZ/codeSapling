import { mergeTypeDefs } from "@graphql-tools/merge";
import { queryTypeDefs } from "./schema";

export const typeDefs = mergeTypeDefs([queryTypeDefs]);
