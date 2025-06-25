import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  userId: User;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LeaveInput: LeaveInput;
  LeaveRequest: ResolverTypeWrapper<LeaveRequest>;
  LeaveStatus: LeaveStatus;
  LeaveType: LeaveType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RequestInput: RequestInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LeaveInput: LeaveInput;
  LeaveRequest: LeaveRequest;
  Mutation: {};
  Query: {};
  RequestInput: RequestInput;
  String: Scalars['String']['output'];
  User: User;
  UserInput: UserInput;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LeaveRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['LeaveRequest'] = ResolversParentTypes['LeaveRequest']> = {
  LeaveType?: Resolver<ResolversTypes['LeaveType'], ParentType, ContextType>;
  approver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  file?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notifyTo?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rejectionReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['LeaveStatus'], ParentType, ContextType>;
  totalHours?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEmployee?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateEmployeeArgs, 'input'>>;
  createLeaveRequest?: Resolver<ResolversTypes['LeaveRequest'], ParentType, ContextType, RequireFields<MutationCreateLeaveRequestArgs, 'input'>>;
  createRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateRoleArgs, 'role'>>;
  deleteLeaveRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteLeaveRequestArgs, 'id'>>;
  deleteRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRoleArgs, '_id'>>;
  editLeaveRequest?: Resolver<ResolversTypes['LeaveRequest'], ParentType, ContextType, RequireFields<MutationEditLeaveRequestArgs, 'id' | 'input'>>;
  editRole?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationEditRoleArgs, '_id' | 'role'>>;
  leaveRequirement?: Resolver<ResolversTypes['LeaveType'], ParentType, ContextType, RequireFields<MutationLeaveRequirementArgs, 'input'>>;
  sendOtp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSendOtpArgs, 'email'>>;
  setNewPassword?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSetNewPasswordArgs, 'email' | 'newPassword'>>;
  updateLeaveStatus?: Resolver<ResolversTypes['LeaveRequest'], ParentType, ContextType, RequireFields<MutationUpdateLeaveStatusArgs, 'id' | 'status'>>;
  verifyOtp?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationVerifyOtpArgs, 'email' | 'otp'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCurrentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetCurrentUserArgs, 'JWT'>>;
  getLeaveRequestById?: Resolver<Maybe<ResolversTypes['LeaveRequest']>, ParentType, ContextType, RequireFields<QueryGetLeaveRequestByIdArgs, 'id'>>;
  getLeaveRequests?: Resolver<Array<ResolversTypes['LeaveRequest']>, ParentType, ContextType>;
  getLeaveRequestsByUser?: Resolver<Array<ResolversTypes['LeaveRequest']>, ParentType, ContextType, RequireFields<QueryGetLeaveRequestsByUserArgs, 'userId'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  sampleQuery?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employedDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employeeRole?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  otpcode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  LeaveRequest?: LeaveRequestResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

