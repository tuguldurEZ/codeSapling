import { Menu } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  return (
    <div className="w-full bg-white border-b-[1px] border-gray-400 h-[80px] flex justify-end px-[80px] py-[6px]">
      <Popover>
        <PopoverTrigger>
          <div className="flex gap-[4px] items-center px-[10px] py-[5px] border border-gray-400 rounded-[26px] w-[96px] h-[50px]">
            {/* {user?.firstName?.[0] || "A"} */}
            <Menu />
            <p className="py-2 font-bold px-4 w-[42px] h-[42px] flex justify-center items-center rounded-full bg-[#DBE9FE] text-sm">
              A
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent>Logout</PopoverContent>
      </Popover>
    </div>
  );
};

export default Header;
