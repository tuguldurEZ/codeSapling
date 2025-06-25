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
  const [isReady, setIsReady] = useState(false);

  const [getCurrentUser] = useGetCurrentUserLazyQuery();

  const { data: userData } = useGetUsersQuery();
  console.log(JWT);
  // Load token from localStorage when mounted
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJWT(token);
      getCurrentUser({ variables: { jwt: token } });
    }
    setIsReady(true);
  }, []);

  // React when currentUserData changes
  // useEffect(() => {
  //   if (currentUserData?.getCurrentUser) {
  //     setCurrentUser(currentUserData.getCurrentUser);
  //   } else {
  //     setCurrentUser(null); // fallback in case token is invalid
  //   }
  // }, []);

  // Get all users
  useEffect(() => {
    if (userData?.getUsers) {
      setUsers(userData.getUsers);
    }
  }, [userData]);

  // Login method
  // const login = useCallback(
  //   (token: string) => {
  //     localStorage.setItem("token", token);
  //     setJWT(token);
  //     const result = getCurrentUser({ variables: { jwt: token } });
  //     console.log(result);

  //     // setCurrentUser(result.)
  //     // console.log(result, 'result');
  //   },
  //   [getCurrentUser]
  // );

  const login = async (token: string) => {
    const result = await getCurrentUser({ variables: { jwt: token } });

    if (result.data?.getCurrentUser._id) {
      localStorage.setItem("token", token);
      setJWT(token);
      setCurrentUser(result?.data?.getCurrentUser);
    }
  };

  // Logout method
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setJWT("");
    setCurrentUser(null);
    client.clearStore(); // clear Apollo cache
  }, [client]);

  if (!isReady) return null;

  return (
    <EmployeeContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
