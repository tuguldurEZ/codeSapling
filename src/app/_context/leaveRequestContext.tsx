"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  LeaveRequest,
  useGetLeaveRequestsQuery,
} from "../../../generated/client-types";

type LeaveRequestContextType = {
  leaveRequests: LeaveRequest[] | null;
  isLoading: boolean;
};

const LeaveRequestContext = createContext<LeaveRequestContextType | undefined>(
  undefined
);

export const useLeaveRequest = () => {
  const context = useContext(LeaveRequestContext);
  if (!context) {
    throw new Error(
      "useLeaveRequest must be used within a LeaveRequestProvider"
    );
  }
  return context;
};

const LeaveRequestProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useGetLeaveRequestsQuery();

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[] | null>(
    null
  );

  useEffect(() => {
    if (data?.getLeaveRequests) {
      setLeaveRequests(data.getLeaveRequests);
    }
  }, [data]);

  return (
    <LeaveRequestContext.Provider
      value={{
        leaveRequests,
        isLoading: loading,
      }}
    >
      {children}
    </LeaveRequestContext.Provider>
  );
};

export default LeaveRequestProvider;
