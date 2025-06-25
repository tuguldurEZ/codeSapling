import { Clock, House, Truck } from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[288px] py-5 px-[20px] flex flex-col h-[91vh] gap-10 bg-[#ffffff]">
      <Link href="/">
        <div className="flex  gap-3">
          <img
            src="https://logowik.com/content/uploads/images/abstract-logo2696.logowik.com.webp"
            alt=""
            className="w-[46px] h-[37.29px]"
          />
          <div>
            <div className="flex items-center ">
              <p className="text-[#09090B] text-[18px] font-bold tracking-[-0.5px] ">
                CodeSapling
              </p>
            </div>
            <p className="text-[12px] text-[#71717A]">hackathon</p>
          </div>
        </div>
      </Link>

      <ToggleGroup type="single" className="flex flex-col items-start gap-4">
        <Link href="dashboard">
          <ToggleGroupItem
            value="a"
            className="flex gap-[10px] items-center px-5 py-2 w-full"
          >
            <House />
            <p className=" text-[14px] font-bold">Хянах самбар</p>
          </ToggleGroupItem>
        </Link>
        <Link href="employees">
          <ToggleGroupItem
            value="b"
            className="flex gap-[10px] items-center px-6 py-2 w-full"
          >
            <Truck />
            <p className=" text-[14px] font-bold w-[70px]">Ажилтнууд</p>
          </ToggleGroupItem>
        </Link>
        <Link href="leave-request">
          <ToggleGroupItem
            value="c"
            className="flex gap-[10px] items-center px-6 py-2 w-full"
          >
            <Clock />
            <p className=" text-[14px] font-bold">Чөлөөны хүсэлтүүд</p>
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
