import { gql } from "apollo-server-micro";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String!
    role: String!
    otpcode: Number
    firstName: String!
    lastName: String!
    employeeDate: Date!
    phone: Number!
  }
`;
