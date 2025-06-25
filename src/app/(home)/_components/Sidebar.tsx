import { Clock, House, Truck } from "lucide-react";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Link from "next/link";
import { useEmployee } from "@/app/_context/employeeContext";

const Sidebar = () => {
  const { currentUser } = useEmployee();

  return (
    <div className="w-[288px] py-5 px-[20px] flex flex-col h-[91vh] gap-10 bg-[#ffffff]">
      <ToggleGroup type="single" className="flex flex-col items-start gap-4">
        <Link href="employee-dashboard">
          <ToggleGroupItem
            value="a"
            className="flex gap-[10px] items-center px-5 py-2 w-full"
          >
            <House />
            <p className=" text-[14px] font-bold">Хянах самбар</p>
          </ToggleGroupItem>
        </Link>
        <Link href="employee-leave-request">
          <ToggleGroupItem
            value="b"
            className="flex gap-[10px] items-center px-6 py-2 w-full"
          >
            <Truck />
            <p className=" text-[14px] font-bold w-[70px]">Чөлөө авах</p>
          </ToggleGroupItem>
        </Link>
        <Link href="leave-request-history">
          <ToggleGroupItem
            value="c"
            className="flex gap-[10px] items-center px-6 py-2 w-full"
          >
            <Clock />
            <p className=" text-[14px] font-bold">Миний хүсэлтүүд</p>
          </ToggleGroupItem>
        </Link>
        {currentUser?.role === "ADMIN" && (
          <Link href="dashboard">
            <ToggleGroupItem
              value="d"
              className="flex gap-[10px] items-center px-6 py-2 w-full"
            >
              <Clock />
              <p className=" text-[14px] font-bold">Админ MODE</p>
            </ToggleGroupItem>
          </Link>
        )}
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
