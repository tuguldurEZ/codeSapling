"use client";
import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

type Props = {
  children: ReactNode;
};
const Authlayout = (props: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      {props.children}
      {/* <Toaster /> */}
    </div>
  );
  // }
};

export default Authlayout;
