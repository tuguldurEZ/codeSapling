"use client";
import React, { ReactNode, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { useEmployee } from "../_context/employeeContext";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { currentUser, isLoading } = useEmployee();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/auth/sign-in");
    }
    if (currentUser && currentUser.role !== "ADMIN") {
      router.push("/employee-dashboard");
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB]">
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default AuthLayout;
