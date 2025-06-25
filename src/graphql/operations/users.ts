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
  mutation SendOtp($email: String!) {
    sendOtp(email: $email) {
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

  mutation VerifyOtp($email: String!, $otp: Int!) {
    verifyOtp(email: $email, otp: $otp) {
      message
      token
      role
    }
  }
  query GetCurrentUser($jwt: String!) {
    getCurrentUser(JWT: $jwt) {
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
  mutation CreateEmployee($input: UserInput!) {
    createEmployee(input: $input) {
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
