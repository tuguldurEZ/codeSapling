import { gql } from "apollo-server-micro";

export const roleTypeDefs = gql`
  type Mutation {
    createRole(role: String!): Boolean!
    deleteRole(_id: ID!): Boolean!
  }
`;
