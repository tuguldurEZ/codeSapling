"use client";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Sidebar from "./_components/Sidebar";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
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
