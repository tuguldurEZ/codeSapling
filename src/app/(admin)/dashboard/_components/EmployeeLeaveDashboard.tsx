import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";
import dayjs from "dayjs";
import { useState } from "react";
import { LeaveRequest } from "../../../../../generated/client-types";

export default function EmployeeLeaveDashboard() {
  const { leaveRequests } = useLeaveRequest();
  const today = dayjs();

  const [paidMonth, setPaidMonth] = useState(dayjs());
  const [casualMonth, setCasualMonth] = useState(dayjs());

  const filteredLeavesByType = (type: string, month: dayjs.Dayjs) => {
    return (
      leaveRequests?.filter((leave) => {
        const leaveStart = dayjs(Number(leave.startDate));
        return (
          leave.LeaveType === type &&
          leaveStart.month() === month.month() &&
          leaveStart.year() === month.year()
        );
      }) || []
    );
  };

  const filteredPaidLeaves = filteredLeavesByType("paidLeave", paidMonth);
  const filteredCasualLeaves = filteredLeavesByType("casualLeave", casualMonth);

  const renderLeaveList = (leaves: LeaveRequest[]) => {
    return leaves.map((leave, index) => {
      const user = leave.userId;
      const name = `${user?.lastName || ""} ${user?.firstName || ""}`;
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      return (
        <div key={index} className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-blue-100 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-beige-400 to-orange-500 text-white font-medium rounded-full flex justify-center items-center">
                {initials}
              </div>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">{user?.employeeRole}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">{leave.totalHours} цаг</p>
            <p className="text-sm text-gray-500">
              {Number(leave.totalHours) / 8} өдөр
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full p-4">
      <div className="flex gap-5 w-full">
        <Card className="bg-white w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">
                {paidMonth.format("M")}–р сар цалинтай чөлөө
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  setPaidMonth((prev) => prev.subtract(1, "month"))
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={
                  paidMonth.month() === today.month() &&
                  paidMonth.year() === today.year()
                }
                onClick={() => {
                  const next = paidMonth.add(1, "month");
                  if (next.isAfter(today, "month")) return;
                  setPaidMonth(next);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredPaidLeaves.length === 0 ? (
              <p className="text-sm text-gray-500">
                Тухайн сард цалинтай чөлөө авсан ажилтан алга
              </p>
            ) : (
              renderLeaveList(filteredPaidLeaves)
            )}
          </CardContent>
        </Card>

        <Card className="bg-white w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">
                {casualMonth.format("M")}–р сар энгийн чөлөө
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  setCasualMonth((prev) => prev.subtract(1, "month"))
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={
                  casualMonth.month() === today.month() &&
                  casualMonth.year() === today.year()
                }
                onClick={() => {
                  const next = casualMonth.add(1, "month");
                  if (next.isAfter(today, "month")) return;
                  setCasualMonth(next);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredCasualLeaves.length === 0 ? (
              <p className="text-sm text-gray-500">
                Тухайн сард энгийн чөлөө авсан ажилтан алга
              </p>
            ) : (
              renderLeaveList(filteredCasualLeaves)
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
