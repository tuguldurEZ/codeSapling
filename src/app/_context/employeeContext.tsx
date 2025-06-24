"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useGetCurrentUserQuery, User } from "../../../generated/client-types";

type EmployeeContextType = {
  currentUser: User | null;
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
  const [JWT, setJWT] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedJWT = localStorage.getItem("token");
    if (storedJWT) {
      setJWT(storedJWT);
    }
  }, []);

  const { data } = useGetCurrentUserQuery({
    variables: { jwt: JWT },
    skip: !JWT,
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      setCurrentUser(data.getCurrentUser);
    }
  }, [data]);

  return (
    <EmployeeContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
