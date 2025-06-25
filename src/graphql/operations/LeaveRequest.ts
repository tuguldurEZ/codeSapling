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
`;
