"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  useGetCurrentUserLazyQuery,
  useGetUsersQuery,
  User,
} from "../../../generated/client-types";
import { useApolloClient } from "@apollo/client";

type EmployeeContextType = {
  currentUser: User | null;
  users: User[] | null;
  login: (_token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};

const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const client = useApolloClient();
  const [JWT, setJWT] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [getCurrentUser] = useGetCurrentUserLazyQuery();
  const { data: userData } = useGetUsersQuery();
  console.log(JWT);
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        setJWT(token);
        try {
          const result = await getCurrentUser({ variables: { jwt: token } });
          if (result.data?.getCurrentUser) {
            setCurrentUser(result.data.getCurrentUser);
          }
        } catch (err) {
          console.error("Fetch currentUser failed:", err);
        }
      }

      setIsLoading(false);
    };

    init();
  }, [getCurrentUser]);

  useEffect(() => {
    if (userData?.getUsers) {
      setUsers(userData.getUsers);
    }
  }, [userData]);

  const login = async (token: string) => {
    try {
      const result = await getCurrentUser({ variables: { jwt: token } });

      if (result.data?.getCurrentUser._id) {
        localStorage.setItem("token", token);
        setJWT(token);
        setCurrentUser(result.data.getCurrentUser);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setJWT("");
    setCurrentUser(null);
    client.clearStore();
  }, [client]);

  return (
    <EmployeeContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
