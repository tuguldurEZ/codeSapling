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
    employeeRole: String!
    leaveType: LeaveTypeRecord
  }
  input UserInput {
    email: String!
    role: String
    firstName: String!
    lastName: String!
    employedDate: String!
    phone: Int!
    employeeRole: String!
  }
  type AuthResponse {
    message: String!
    token: String!
    role: String!
  }
  type Mutation {
    createEmployee(input: UserInput!): User!
    sendOtp(email: String!): User!
    verifyOtp(email: String!, otp: Int!): AuthResponse!
    setNewPassword(email: String!, newPassword: String!): String!
    editRole(_id: ID!, role: String!): Boolean!
  }
  type Query {
    getUsers: [User!]!
    getCurrentUser(JWT: String!): User!
  }
`;
