"use client";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";

import React from "react";
import { CircleAlert, Check, X } from "lucide-react";
import { useEmployee } from "@/app/_context/employeeContext";
const leaveTypeLabel = {
  casualLeave: "Энгийн чөлөө",
  paidLeave: "Цалинтай чөлөө",
  annualLeave: "Ээлжийн амралт",
  remoteWork: "Зайнаас ажилласан",
} as const;

const calculateHours = (start: string, end: string) => {
  const startTime = parseInt(start);
  const endTime = parseInt(end);
  const diffMs = endTime - startTime;
  const hours = diffMs / (1000 * 60 * 60);
  return hours;
};

const RecentRequests = () => {
  const { leaveRequests, isLoading } = useLeaveRequest();
  const { users } = useEmployee();

  if (isLoading) return;
  if (!leaveRequests?.length) return <p className="px-6 py-4">Хүсэлт алга</p>;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <div className="flex gap-1 rounded-[12px] bg-[#FEF9C3] py-1 px-[6px] text-[#854D0F] items-center">
            <CircleAlert className="w-4 h-4" />
            <span className="font-bold">Хүлээгдэж буй</span>
          </div>
        );
      case "APPROVED":
        return (
          <div className="flex gap-1 rounded-[12px] bg-[#DCFCE7] py-1 px-[6px] text-[#166434] items-center">
            <Check className="w-4 h-4" />
            <span className="font-bold">Баталсан</span>
          </div>
        );
      case "REJECTED":
        return (
          <div className="flex gap-1 rounded-[12px] bg-[#FECACA] py-1 px-[6px] text-[#991B1B] items-center">
            <X className="w-4 h-4" />
            <span className="font-bold">Татгалзсан</span>
          </div>
        );
      default:
        return null;
    }
  };

  const roleCounts = users?.reduce((acc: Record<string, number>, user) => {
    const role = user.employeeRole;
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex w-full gap-5 p-4">
      <div className="p-6 flex flex-col gap-5 rounded-lg bg-white w-full">
        <p className="font-bold text-[20px]">Сүүлийн хүсэлтүүд</p>

        {leaveRequests.slice(0, 3).map((leave, index) => {
          const user = leave.userId;
          if (!user) return null;

          const leaveType =
            leaveTypeLabel[leave.LeaveType as keyof typeof leaveTypeLabel];
          const hours = calculateHours(leave.startDate, leave.endDate);

          return (
            <div
              key={leave.id || index}
              className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-beige-50 to-gray-50 hover:from-beige-100 hover:to-gray-100 transition-colors"
            >
              <div className="w-full p-2 flex gap-3 items-center mb-2">
                <div className="bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium">
                  {user?.firstName?.[0] || "A"}
                </div>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="font-bold">{user.firstName}</p>
                    <p className="text-[#737373] font-medium">
                      {leaveType} - {hours} цаг{" "}
                    </p>
                  </div>
                  {getStatusBadge(leave.status)}
                </div>
              </div>

              {/* <div className="ml-14 text-sm text-gray-700 space-y-1">
                <p>Шалтгаан: {leave.reason}</p>
              </div> */}
            </div>
          );
        })}
        <button className="text-end text-[#717171] text-[14px]">
          Дэлгэрэнгүй
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5 rounded-lg bg-white w-full">
        <p className="font-bold text-[20px] ">Ажилчдын тойм</p>

        <div className="flex rounded-[4px] bg-gradient-to-r from-beige-50 to-gray-50 hover:from-beige-100 hover:to-gray-100 transition-colors p-3 items-center justify-between w-full">
          <div className="">
            <p className="text-[20px] font-bold">Идэвхитэй</p>
            <p className="text-[#737373]">Нийт ажилтан</p>
          </div>
          <p className="text-[30px] font-bold">{users?.length}</p>
        </div>
        {Object.entries(roleCounts || {})
          .slice(0, 4)
          .map(([role, count]) => (
            <div
              key={role}
              className="flex  h-[40px] rounded-lg bg-gradient-to-r from-beige-50 to-gray-50 hover:from-beige-100 hover:to-gray-100 transition-colors p-3 items-center justify-between w-full"
            >
              <p className="text-[#404040] font-medium">{role}</p>
              <p className="text-[30px] font-bold">{count}</p>
            </div>
          ))}
        <button className="text-end text-[#717171] mt-3 text-[14px]">
          Дэлгэрэнгүй
        </button>
      </div>
    </div>
  );
};

export default RecentRequests;
