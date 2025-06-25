/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";
import {
  LeaveStatus,
  useUpdateLeaveStatusMutation,
} from "../../../../../generated/client-types";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

interface LeaveRequest {
  id: string;
  name: string;
  dateRange: string;
  duration: string;
  type: string;
  title: string;
  submittedAt: string;
  status: RequestStatus;
}

const statusConfig: Record<
  RequestStatus,
  { label: string; icon: any; className: string }
> = {
  PENDING: {
    label: "Хүлээгдэж буй",
    icon: AlertCircle,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  APPROVED: {
    label: "Зөвшөөрөгдсөн",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 border-green-200",
  },
  REJECTED: {
    label: "Татгалзсан",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export default function LeaveRequest() {
  const { leaveRequests } = useLeaveRequest();
  const [activeFilter, setActiveFilter] = useState<"all" | RequestStatus>(
    "all"
  );
  const [updateLeaveStatus, { loading }] = useUpdateLeaveStatusMutation();
  if (!leaveRequests) {
    return <div>Түр хүлээнэ үү...</div>;
  }

  const leaveTypeLabels: Record<string, string> = {
    paidLeave: "Цалинтай чөлөө",
    casualLeave: "Энгийн амралт",
    remoteWork: "Зайнаас ажилласан",
    annualLeave: "Ээлжийн амралт",
  };

  const convertedLeaveRequests: LeaveRequest[] = leaveRequests.map(
    (req: any) => {
      const start = new Date(Number(req.startDate));
      const end = new Date(Number(req.endDate));
      const dateRange = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;

      const duration =
        req.totalHours != null
          ? `${req.totalHours} цаг`
          : Math.round(
              (Number(req.endDate) - Number(req.startDate)) /
                (1000 * 60 * 60 * 24)
            ) + " өдөр";

      return {
        id: req.id,
        name: req.userId
          ? `${req.userId.firstName} ${req.userId.lastName}`
          : "Мэдээлэл байхгүй",
        dateRange,
        duration,
        type: leaveTypeLabels[req.LeaveType] ?? "Тодорхойгүй",
        title: req.reason ?? "Тайлбаргүй",
        submittedAt: new Date(Number(req.createdAt)).toLocaleDateString(),
        status: req.status as RequestStatus,
      };
    }
  );

  const filteredRequests = (() => {
    const filtered = convertedLeaveRequests.filter(
      (request) => activeFilter === "all" || request.status === activeFilter
    );

    if (activeFilter === "all") {
      return filtered.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0;
      });
    }

    return filtered;
  })();

  const handleStatusChange = async (
    requestId: string,
    newStatus: RequestStatus
  ) => {
    await updateLeaveStatus({
      variables: {
        updateLeaveStatusId: requestId,
        status: newStatus as LeaveStatus,
      },
    });
  };

  const filters = [
    { key: "all", label: "Бүгд" },
    { key: "PENDING", label: "Хүлээгдэж буй" },
    { key: "APPROVED", label: "Зөвшөөрсөн" },
    { key: "REJECTED", label: "Татгалзсан" },
  ];

  return (
    <div className="w-full bg-gray-50 p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Чөлөөний хүсэлтүүд
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-black text-white hover:bg-gray-800"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Чөлөөний хүсэлт
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-6">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "ghost"}
              className={`rounded-full px-4 py-2 ${
                activeFilter === filter.key
                  ? "bg-black text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() =>
                setActiveFilter(filter.key as "all" | RequestStatus)
              }
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="w-full space-y-4">
          {filteredRequests.map((request) => {
            const StatusIcon = statusConfig[request.status].icon;

            return (
              <div
                key={request.id}
                className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="w-full flex items-start justify-between">
                  <div className="w-full flex items-start gap-4">
                    <Avatar className="w-12 h-12 bg-blue-100">
                      <AvatarFallback className="text-blue-600 font-medium">
                        {request.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="w-full flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-medium text-gray-900">
                          {request.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {request.dateRange}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {request.duration}
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 border-green-200"
                        >
                          {request.type}
                        </Badge>
                      </div>

                      <h4 className="font-medium text-gray-900 mb-1">
                        {request.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Илгээсэн: {request.submittedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {request.status === "PENDING" ? (
                      <>
                        <Badge className={statusConfig.PENDING.className}>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {statusConfig.PENDING.label}
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() =>
                            handleStatusChange(request.id, "APPROVED")
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Зөвшөөрөх
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleStatusChange(request.id, "REJECTED")
                          }
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Татгалзах
                        </Button>
                      </>
                    ) : (
                      <Badge className={statusConfig[request.status].className}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[request.status].label}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
