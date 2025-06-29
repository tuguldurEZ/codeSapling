"use client";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";
import {
  CalendarDays,
  ChartLine,
  Clock,
  ShieldAlert,
  User,
} from "lucide-react";
import React from "react";

const StatusDashboard = () => {
  const { leaveRequests, isLoading } = useLeaveRequest();

  if (isLoading) return;
  if (!leaveRequests)
    return <p className="px-6 py-4 text-red-500">Алдаа: Өгөгдөл олдсонгүй</p>;

  const totalCasualLeave = leaveRequests.filter(
    (req) => req.LeaveType === "casualLeave"
  ).length;

  const totalPaidLeave = leaveRequests.filter(
    (req) => req.LeaveType === "paidLeave"
  ).length;

  const totalRemoteWork = leaveRequests.filter(
    (req) => req.LeaveType === "remoteWork"
  ).length;

  const totalAnnualLeave = leaveRequests.filter(
    (req) => req.LeaveType === "annualLeave"
  ).length;

  const pendingRequests = leaveRequests.filter(
    (req) => req.status === "PENDING"
  ).length;

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className=" border-1 shadow-1xl rounded-2xl bg-white hover:border-t-neutral-400 p-4">
          <CalendarDays className="bg-" />
          <p className="text-2xl font-bold">{totalCasualLeave} удаа</p>
          <p className="text-[14px] text-gray-600">Энэ сарын нийт чөлөө</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-1xl border hover:border-t-neutral-400">
          <ChartLine />
          <p className="text-2xl font-bold">{totalPaidLeave} удаа</p>
          <p className="text-[14px] text-gray-600">Энэ жилийн цалинтай чөлөө</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-1xl border hover:border-t-neutral-400">
          <Clock />
          <p className="text-2xl font-bold">{totalRemoteWork} удаа</p>
          <p className="text-[14px] text-gray-600">
            Энэ сарын зайнаас ажилласан
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-1xl border hover:border-t-neutral-400">
          <User />
          <p className="text-2xl font-bold">{totalAnnualLeave} хүн</p>
          <p className="text-[14px] text-gray-600">Ээлжийн амралт</p>
        </div>
      </div>

      {pendingRequests !== 0 && (
        <div className="border border-[#B90808] p-4 rounded-md bg-white flex gap-[12px]">
          <div className="flex justify-center items-center">
            <ShieldAlert />
          </div>
          <div>
            <p className="font-semibold text-2xl">{pendingRequests} хүсэлт</p>
            <p className="text-sm">Шийдвэр хүсэж буй хүсэлтүүд</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDashboard;
