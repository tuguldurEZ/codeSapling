import { Clock, House, Truck, User } from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[20vw] py-5 px-[20px] flex flex-col  gap-10 bg-[#ffffff]">
      <ToggleGroup type="single" className="flex flex-col items-start gap-4">
        <Link href="dashboard">
          <ToggleGroupItem
            value="a"
            className="flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-gradient-to-br data-[state=on]:from-orange-300 data-[state=on]:to-orange-500 data-[state=on]:text-white data-[state=on]:rounded-full data-[state=on]:font-medium"
          >
            <House />
            <p className=" text-[14px] font-bold">Хянах самбар</p>
          </ToggleGroupItem>
        </Link>
        <Link href="employees">
          <ToggleGroupItem
            value="b"
            className="flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-gradient-to-br data-[state=on]:from-orange-300 data-[state=on]:to-orange-500 data-[state=on]:text-white data-[state=on]:rounded-full data-[state=on]:font-medium"
          >
            <Truck />
            <p className=" text-[14px] font-bold w-[70px]">Ажилтнууд</p>
          </ToggleGroupItem>
        </Link>
        <Link href="leave-request">
          <ToggleGroupItem
            value="c"
            className="flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-gradient-to-br data-[state=on]:from-orange-300 data-[state=on]:to-orange-500 data-[state=on]:text-white data-[state=on]:rounded-full data-[state=on]:font-medium"
          >
            <Clock />
            <p className=" text-[14px] font-bold">Чөлөөны хүсэлтүүд</p>
          </ToggleGroupItem>
        </Link>
        <Link href="employee-dashboard">
          <ToggleGroupItem
            value="d"
            className="flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-gradient-to-br data-[state=on]:from-orange-300 data-[state=on]:to-orange-500 data-[state=on]:text-white data-[state=on]:rounded-full data-[state=on]:font-medium"
          >
            <User />
            <p className=" text-[14px] font-bold">Ажилтан хэсэг</p>
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
