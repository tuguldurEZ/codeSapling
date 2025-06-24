import { gql } from "@apollo/client";

export const CREATE_LEAVE_REQUEST = gql`
  query GetUsers {
    getUsers {
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
`;
