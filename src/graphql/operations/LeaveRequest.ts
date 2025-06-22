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
`;
