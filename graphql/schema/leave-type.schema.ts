import { gql } from "apollo-server-micro";

export const leaveTypeDefs = gql`
  type LeaveTypeRecord {
    _id: ID!
    casualLeave: Int
    paidLeave: Int
    annualLeave: Int
    remoteWork: Int
  }
  input LeaveInput {
    casualLeave: Int
    paidLeave: Int
    remoteWork: Int
    annualLeave: Int
  }
  type Mutation {
    leaveRequirement(input: LeaveInput!): LeaveType!
  }
`;
