"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "./_components/Sidebar";
import { useEmployee } from "../_context/employeeContext";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";

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
      <div className="w-full h-screen flex justify-center items-center">
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
      </div>
    </div>
  );
};

export default AuthLayout;
