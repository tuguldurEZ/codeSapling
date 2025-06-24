"use client";
import React, { ReactNode } from "react";
import Header from "@/components/Header";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="bg-[#F9FAFB]">
      <Header />
      <div className="flex">{children}</div>
    </div>
  );
};

export default AuthLayout;
