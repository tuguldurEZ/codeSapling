"use client";
import { Menu } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
  };
  return (
    <div className="w-full bg-white border-b-[1px] border-gray-400 h-[80px] flex justify-between px-8 py-[6px]">
      <Link href="/employee-dashboard">
        <div className="flex mt-2 gap-3">
          <img
            src="https://logowik.com/content/uploads/images/abstract-logo2696.logowik.com.webp"
            alt=""
            className="w-[46px] h-[37.29px]"
          />
          <div>
            <div className="flex items-center ">
              <p className="text-[#09090B] text-[18px] font-bold tracking-[-0.5px] ">
                Codesapling
              </p>
            </div>
            <p className="text-[12px] text-[#71717A]">academy</p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <p className="bg-[#DCFCE7] text-[#166434] py-[6px]  text-base font-semibold rounded-2xl px-4">
          Ажилтан
        </p>
        <Popover>
          <PopoverTrigger>
            <div className="flex gap-[4px] items-center px-[10px] py-[5px] border border-gray-400 rounded-[26px] w-[96px] h-[50px]">
              <Menu />
              <p className="py-2 font-bold px-4 w-[42px] h-[42px] flex justify-center items-center rounded-full bg-[#DBE9FE] text-sm">
                A
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <button onClick={logoutHandler}>Logout</button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
