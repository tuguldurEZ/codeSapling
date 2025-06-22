import { gql } from "apollo-server-micro";

export const roleTypeDefs = gql`
  type Mutation {
    createRole(role: String!): Boolean!
    editRole(role: String!, _id: ID!): Boolean!
    deleteRole(_id: ID!): Boolean!
  }
`;
