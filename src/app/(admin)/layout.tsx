"use client";
import React, { ReactNode, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { useEmployee } from "../_context/employeeContext";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const { currentUser } = useEmployee();

  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.role !== "ADMIN") {
      router.push("/");
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <div>Хандах эрхгүй байна</div>;
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
