import { gql } from "apollo-server-micro";

export const leaveRequestDefs = gql`
  enum LeaveType {
    casualLeave
    paidLeave
    remoteWork
    annualLeave
  }

  enum LeaveStatus {
    PENDING
    APPROVED
    REJECTED
  }

  type LeaveRequest {
    id: ID!
    userId: User
    startDate: String!
    endDate: String!
    status: LeaveStatus!
    totalHours: Float
    reason: String!
    file: String
    approver: User
    notifyTo: [User!]
    rejectionReason: String
    LeaveType: LeaveType!
    createdAt: String!
    updatedAt: String!
  }

  input RequestInput {
    userId: ID!
    startDate: String!
    endDate: String!
    reason: String!
    file: String
    approver: ID!
    notifyTo: [ID!]
    LeaveType: LeaveType!
  }

  type Query {
    getLeaveRequestsByUser(userId: ID!): [LeaveRequest!]!
    getLeaveRequests: [LeaveRequest!]!
    getLeaveRequestById(id: ID!): LeaveRequest
  }

  type Mutation {
    createLeaveRequest(input: RequestInput!): LeaveRequest!
    updateLeaveStatus(
      id: ID!
      status: LeaveStatus!
      rejectionReason: String
    ): LeaveRequest!
    editLeaveRequest(id: ID!, input: RequestInput!): LeaveRequest!
    deleteLeaveRequest(id: ID!): Boolean!
  }
`;
