import {
  CalendarDays,
  ChartLine,
  Clock,
  ShieldAlert,
  User,
} from "lucide-react";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="w-[235px] h-[120px] border-1 shadow-1xl rounded-2xl bg-white hover:border-t-neutral-400 p-4">
          <CalendarDays />
          <p className="text-2xl font-bold">0 цаг</p>
          <p className="text-[14px] text-gray-600">Энэ сарын нийт чөлөө</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-1xl border hover:border-t-neutral-400">
          <ChartLine />
          <p className="text-2xl font-bold">0 цаг</p>
          <p className="text-[14px] text-gray-600">Энэ жилийн цалинтай чөлөө</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-1xl border hover:border-t-neutral-400">
          <Clock />
          <p className="text-2xl font-bold">0 өдөр</p>
          <p className="text-[14px] text-gray-600">
            Энэ сарын зайнаас ажилласан
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-1xl border hover:border-t-neutral-400">
          <User />
          <p className="text-2xl font-bold">1 хүн</p>
          <p className="text-[14px] text-gray-600">Ээлжийн амралт</p>
        </div>
      </div>

      <div className="border border-[#B90808] p-4 rounded-md bg-white flex gap-[12px]">
        <div className="flex justify-center items-center">
          <ShieldAlert />
        </div>
        <div>
          <p className="font-semibold text-2xl">1 хүсэлт</p>
          <p className="text-sm">Шийдвэр хүсэж буй хүсэлтүүд</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
