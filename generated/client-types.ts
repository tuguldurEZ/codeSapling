import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  message: Scalars['String']['output'];
  role: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type LeaveInput = {
  annualLeave?: InputMaybe<Scalars['Int']['input']>;
  casualLeave?: InputMaybe<Scalars['Int']['input']>;
  paidLeave?: InputMaybe<Scalars['Int']['input']>;
  remoteWork?: InputMaybe<Scalars['Int']['input']>;
};

export type LeaveRequest = {
  __typename?: 'LeaveRequest';
  LeaveType: LeaveType;
  approver?: Maybe<User>;
  createdAt: Scalars['String']['output'];
  endDate: Scalars['String']['output'];
  file?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notifyTo?: Maybe<Array<User>>;
  reason: Scalars['String']['output'];
  rejectionReason?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['String']['output'];
  status: LeaveStatus;
  totalHours?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['String']['output'];
  userId?: Maybe<User>;
};

export enum LeaveStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum LeaveType {
  AnnualLeave = 'annualLeave',
  CasualLeave = 'casualLeave',
  PaidLeave = 'paidLeave',
  RemoteWork = 'remoteWork'
}

export type LeaveTypeRecord = {
  __typename?: 'LeaveTypeRecord';
  _id: Scalars['ID']['output'];
  annualLeave?: Maybe<Scalars['Int']['output']>;
  casualLeave?: Maybe<Scalars['Int']['output']>;
  paidLeave?: Maybe<Scalars['Int']['output']>;
  remoteWork?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEmployee: User;
  createLeaveRequest: LeaveRequest;
  createRole: Scalars['Boolean']['output'];
  deleteLeaveRequest: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  editLeaveRequest: LeaveRequest;
  editRole: Scalars['Boolean']['output'];
  leaveRequirement: LeaveType;
  sendOtp: User;
  setNewPassword: Scalars['String']['output'];
  updateLeaveStatus: LeaveRequest;
  verifyOtp: AuthResponse;
};


export type MutationCreateEmployeeArgs = {
  input: UserInput;
};


export type MutationCreateLeaveRequestArgs = {
  input: RequestInput;
};


export type MutationCreateRoleArgs = {
  role: Scalars['String']['input'];
};


export type MutationDeleteLeaveRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationEditLeaveRequestArgs = {
  id: Scalars['ID']['input'];
  input: RequestInput;
};


export type MutationEditRoleArgs = {
  _id: Scalars['ID']['input'];
  role: Scalars['String']['input'];
};


export type MutationLeaveRequirementArgs = {
  input: LeaveInput;
};


export type MutationSendOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetNewPasswordArgs = {
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUpdateLeaveStatusArgs = {
  id: Scalars['ID']['input'];
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
  status: LeaveStatus;
};


export type MutationVerifyOtpArgs = {
  email: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser: User;
  getLeaveRequestById?: Maybe<LeaveRequest>;
  getLeaveRequests: Array<LeaveRequest>;
  getLeaveRequestsByUser: Array<LeaveRequest>;
  getUsers: Array<User>;
  sampleQuery?: Maybe<Scalars['String']['output']>;
};


export type QueryGetCurrentUserArgs = {
  JWT: Scalars['String']['input'];
};


export type QueryGetLeaveRequestByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetLeaveRequestsByUserArgs = {
  userId: Scalars['ID']['input'];
};

export type RequestInput = {
  LeaveType: LeaveType;
  approver: Scalars['ID']['input'];
  endDate: Scalars['String']['input'];
  file?: InputMaybe<Scalars['String']['input']>;
  notifyTo?: InputMaybe<Array<Scalars['ID']['input']>>;
  reason: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  employedDate: Scalars['String']['output'];
  employeeRole: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  leaveType?: Maybe<LeaveTypeRecord>;
  otpcode?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  phone: Scalars['Int']['output'];
  role?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  email: Scalars['String']['input'];
  employedDate: Scalars['String']['input'];
  employeeRole: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['Int']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type CreateLeaveRequestMutationVariables = Exact<{
  input: RequestInput;
}>;


export type CreateLeaveRequestMutation = { __typename?: 'Mutation', createLeaveRequest: { __typename?: 'LeaveRequest', id: string, reason: string, status: LeaveStatus, startDate: string, endDate: string, LeaveType: LeaveType } };

export type GetLeaveRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeaveRequestsQuery = { __typename?: 'Query', getLeaveRequests: Array<{ __typename?: 'LeaveRequest', id: string, startDate: string, endDate: string, status: LeaveStatus, totalHours?: number | null, reason: string, file?: string | null, rejectionReason?: string | null, LeaveType: LeaveType, createdAt: string, updatedAt: string, userId?: { __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string } | null }> };

export type GetLeaveRequestsByUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetLeaveRequestsByUserQuery = { __typename?: 'Query', getLeaveRequestsByUser: Array<{ __typename?: 'LeaveRequest', id: string, startDate: string, endDate: string, status: LeaveStatus, totalHours?: number | null, reason: string, file?: string | null, rejectionReason?: string | null, LeaveType: LeaveType, createdAt: string, updatedAt: string, userId?: { __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string } | null }> };

export type UpdateLeaveStatusMutationVariables = Exact<{
  updateLeaveStatusId: Scalars['ID']['input'];
  status: LeaveStatus;
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateLeaveStatusMutation = { __typename?: 'Mutation', updateLeaveStatus: { __typename?: 'LeaveRequest', id: string, startDate: string, endDate: string, status: LeaveStatus, totalHours?: number | null, reason: string, file?: string | null, rejectionReason?: string | null, LeaveType: LeaveType, createdAt: string, updatedAt: string, userId?: { __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string, leaveType?: { __typename?: 'LeaveTypeRecord', _id: string, casualLeave?: number | null, paidLeave?: number | null, annualLeave?: number | null, remoteWork?: number | null } | null } | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string }> };

export type SendOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string } };

export type VerifyOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'AuthResponse', message: string, token: string, role: string } };

export type GetCurrentUserQueryVariables = Exact<{
  jwt: Scalars['String']['input'];
}>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string } };

export type CreateEmployeeMutationVariables = Exact<{
  input: UserInput;
}>;


export type CreateEmployeeMutation = { __typename?: 'Mutation', createEmployee: { __typename?: 'User', _id: string, email: string, password?: string | null, role?: string | null, otpcode?: number | null, firstName: string, lastName: string, employedDate: string, phone: number, employeeRole: string } };


export const CreateLeaveRequestDocument = gql`
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
export type CreateLeaveRequestMutationFn = Apollo.MutationFunction<CreateLeaveRequestMutation, CreateLeaveRequestMutationVariables>;

/**
 * __useCreateLeaveRequestMutation__
 *
 * To run a mutation, you first call `useCreateLeaveRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLeaveRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLeaveRequestMutation, { data, loading, error }] = useCreateLeaveRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLeaveRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateLeaveRequestMutation, CreateLeaveRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLeaveRequestMutation, CreateLeaveRequestMutationVariables>(CreateLeaveRequestDocument, options);
      }
export type CreateLeaveRequestMutationHookResult = ReturnType<typeof useCreateLeaveRequestMutation>;
export type CreateLeaveRequestMutationResult = Apollo.MutationResult<CreateLeaveRequestMutation>;
export type CreateLeaveRequestMutationOptions = Apollo.BaseMutationOptions<CreateLeaveRequestMutation, CreateLeaveRequestMutationVariables>;
export const GetLeaveRequestsDocument = gql`
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

/**
 * __useGetLeaveRequestsQuery__
 *
 * To run a query within a React component, call `useGetLeaveRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeaveRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeaveRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLeaveRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>(GetLeaveRequestsDocument, options);
      }
export function useGetLeaveRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>(GetLeaveRequestsDocument, options);
        }
export function useGetLeaveRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>(GetLeaveRequestsDocument, options);
        }
export type GetLeaveRequestsQueryHookResult = ReturnType<typeof useGetLeaveRequestsQuery>;
export type GetLeaveRequestsLazyQueryHookResult = ReturnType<typeof useGetLeaveRequestsLazyQuery>;
export type GetLeaveRequestsSuspenseQueryHookResult = ReturnType<typeof useGetLeaveRequestsSuspenseQuery>;
export type GetLeaveRequestsQueryResult = Apollo.QueryResult<GetLeaveRequestsQuery, GetLeaveRequestsQueryVariables>;
export const GetLeaveRequestsByUserDocument = gql`
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
    `;

/**
 * __useGetLeaveRequestsByUserQuery__
 *
 * To run a query within a React component, call `useGetLeaveRequestsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeaveRequestsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeaveRequestsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetLeaveRequestsByUserQuery(baseOptions: Apollo.QueryHookOptions<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables> & ({ variables: GetLeaveRequestsByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables>(GetLeaveRequestsByUserDocument, options);
      }
export function useGetLeaveRequestsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables>(GetLeaveRequestsByUserDocument, options);
        }
export function useGetLeaveRequestsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables>(GetLeaveRequestsByUserDocument, options);
        }
export type GetLeaveRequestsByUserQueryHookResult = ReturnType<typeof useGetLeaveRequestsByUserQuery>;
export type GetLeaveRequestsByUserLazyQueryHookResult = ReturnType<typeof useGetLeaveRequestsByUserLazyQuery>;
export type GetLeaveRequestsByUserSuspenseQueryHookResult = ReturnType<typeof useGetLeaveRequestsByUserSuspenseQuery>;
export type GetLeaveRequestsByUserQueryResult = Apollo.QueryResult<GetLeaveRequestsByUserQuery, GetLeaveRequestsByUserQueryVariables>;
export const UpdateLeaveStatusDocument = gql`
    mutation UpdateLeaveStatus($updateLeaveStatusId: ID!, $status: LeaveStatus!, $rejectionReason: String) {
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
export type UpdateLeaveStatusMutationFn = Apollo.MutationFunction<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>;

/**
 * __useUpdateLeaveStatusMutation__
 *
 * To run a mutation, you first call `useUpdateLeaveStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLeaveStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLeaveStatusMutation, { data, loading, error }] = useUpdateLeaveStatusMutation({
 *   variables: {
 *      updateLeaveStatusId: // value for 'updateLeaveStatusId'
 *      status: // value for 'status'
 *      rejectionReason: // value for 'rejectionReason'
 *   },
 * });
 */
export function useUpdateLeaveStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>(UpdateLeaveStatusDocument, options);
      }
export type UpdateLeaveStatusMutationHookResult = ReturnType<typeof useUpdateLeaveStatusMutation>;
export type UpdateLeaveStatusMutationResult = Apollo.MutationResult<UpdateLeaveStatusMutation>;
export type UpdateLeaveStatusMutationOptions = Apollo.BaseMutationOptions<UpdateLeaveStatusMutation, UpdateLeaveStatusMutationVariables>;
export const GetUsersDocument = gql`
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

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const SendOtpDocument = gql`
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
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOtp($email: String!, $otp: Int!) {
  verifyOtp(email: $email, otp: $otp) {
    message
    token
    role
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const GetCurrentUserDocument = gql`
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
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      jwt: // value for 'jwt'
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables> & ({ variables: GetCurrentUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const CreateEmployeeDocument = gql`
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
export type CreateEmployeeMutationFn = Apollo.MutationFunction<CreateEmployeeMutation, CreateEmployeeMutationVariables>;

/**
 * __useCreateEmployeeMutation__
 *
 * To run a mutation, you first call `useCreateEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmployeeMutation, { data, loading, error }] = useCreateEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(CreateEmployeeDocument, options);
      }
export type CreateEmployeeMutationHookResult = ReturnType<typeof useCreateEmployeeMutation>;
export type CreateEmployeeMutationResult = Apollo.MutationResult<CreateEmployeeMutation>;
export type CreateEmployeeMutationOptions = Apollo.BaseMutationOptions<CreateEmployeeMutation, CreateEmployeeMutationVariables>;