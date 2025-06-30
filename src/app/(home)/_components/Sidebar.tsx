import { Clock, House, ShieldUser, Truck } from "lucide-react";
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
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <House />
            <p className="text-[14px] font-bold group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Хянах самбар
            </p>
          </ToggleGroupItem>
        </Link>

        <Link href="employee-leave-request">
          <ToggleGroupItem
            value="b"
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <Truck />
            <p className="text-[14px] font-bold w-[92px] group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Чөлөө авах
            </p>
          </ToggleGroupItem>
        </Link>

        <Link href="leave-request-history">
          <ToggleGroupItem
            value="c"
            className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
          >
            <Clock />
            <p className="text-[14px] font-bold group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
              Миний хүсэлтүүд
            </p>
          </ToggleGroupItem>
        </Link>

        {currentUser?.role === "ADMIN" && (
          <Link href="dashboard">
            <ToggleGroupItem
              value="d"
              className="group flex gap-[10px] items-center px-5 py-2 w-full data-[state=on]:bg-transparent"
            >
              <ShieldUser />
              <p className="text-[14px] font-bold group-data-[state=on]:bg-gradient-to-br group-data-[state=on]:from-orange-300 group-data-[state=on]:to-orange-500 group-data-[state=on]:bg-clip-text group-data-[state=on]:text-transparent">
                Админ хэсэг
              </p>
            </ToggleGroupItem>
          </Link>
        )}
      </ToggleGroup>
    </div>
  );
};

export default Sidebar;
