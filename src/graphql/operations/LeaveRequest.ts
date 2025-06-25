import { gql } from "@apollo/client";

export const CREATE_LEAVE_REQUEST = gql`
  mutation CreateLeaveRequest($input: RequestInput!) {
    createLeaveRequest(input: $input) {
      id
      reason
      status
      startDate
      endDate
      LeaveType
    }
  }
  query GetLeaveRequests {
    getLeaveRequests {
      id
      startDate
      endDate
      status
      totalHours
      reason
      file
      rejectionReason
      LeaveType
      createdAt
      updatedAt
      userId {
        _id
        email
        password
        role
        otpcode
        firstName
        lastName
        employedDate
        phone
        employeeRole
      }
    }
  }
  query GetLeaveRequestsByUser($userId: ID!) {
    getLeaveRequestsByUser(userId: $userId) {
      id
      userId {
        _id
        email
        password
        role
        otpcode
        firstName
        lastName
        employedDate
        phone
        employeeRole
      }
      startDate
      endDate
      status
      totalHours
      reason
      file
      rejectionReason
      LeaveType
      createdAt
      updatedAt
    }
  }
  mutation UpdateLeaveStatus(
    $updateLeaveStatusId: ID!
    $status: LeaveStatus!
    $rejectionReason: String
  ) {
    updateLeaveStatus(
      id: $updateLeaveStatusId
      status: $status
      rejectionReason: $rejectionReason
    ) {
      id
      userId {
        _id
        email
        password
        role
        otpcode
        firstName
        lastName
        employedDate
        phone
        employeeRole
        leaveType {
          _id
          casualLeave
          paidLeave
          annualLeave
          remoteWork
        }
      }
      startDate
      endDate
      status
      totalHours
      reason
      file
      rejectionReason
      LeaveType
      createdAt
      updatedAt
    }
  }
`;
