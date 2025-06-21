import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String
    role: String
    otpcode: Int
    firstName: String!
    lastName: String!
    employedDate: String!
    phone: Int!
  }
  input UserInput {
    email: String!
    role: String
    firstName: String!
    lastName: String!
    employedDate: String!
    phone: Int!
  }
  type Mutation {
    createEmployee(input: UserInput!): User!
    sendOtp(email: String!): User!
    verifyOtp(email: String!, otp: Int!): Boolean!
    setNewPassword(email: String!, newPassword: String!): String!
  }
`;
