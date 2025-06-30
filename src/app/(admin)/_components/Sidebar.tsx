import { Clock, House, Truck, User } from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[20vw] py-5 px-[20px] flex flex-col gap-10 bg-[#ffffff]">
      <ToggleGroup
        type="single"
        className="flex flex-col items-start gap-4 hover:bg-none"
      >
        <Link href="dashboard">
          <ToggleGroupItem
            value="a"
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <House />
            <p className="text-[14px] font-bold group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Хянах самбар
            </p>
          </ToggleGroupItem>
        </Link>

        <Link href="employees">
          <ToggleGroupItem
            value="b"
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <Truck />
            <p className="text-[14px] font-bold w-[85px] group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Ажилтнууд
            </p>
          </ToggleGroupItem>
        </Link>

        <Link href="leave-request">
          <ToggleGroupItem
            value="c"
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <Clock />
            <p className="text-[14px] font-bold group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Чөлөөны хүсэлтүүд
            </p>
          </ToggleGroupItem>
        </Link>

        <Link href="employee-dashboard">
          <ToggleGroupItem
            value="d"
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <User />
            <p className="text-[14px] font-bold group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Ажилтан хэсэг
            </p>
          </ToggleGroupItem>
        </Link>
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
