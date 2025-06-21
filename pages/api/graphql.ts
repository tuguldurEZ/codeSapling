import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";

import { typeDefs } from "../../graphql/schema/index";
import { resolvers } from "../../graphql/resolvers";
import { connectMongoDb } from "../../utils/connect-to-db";

await connectMongoDb();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});
