"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "./_components/Sidebar";
import { useEmployee } from "../_context/employeeContext";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const { currentUser, isLoading } = useEmployee();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/auth/sign-in");
    }
  }, [isLoading, currentUser, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Түр хүлээнэ үү...</p>
      </div>
    );
  }
  return (
    <div className="bg-[#F9FAFB]">
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
