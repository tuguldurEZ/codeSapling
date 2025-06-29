/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  createdAt: number;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [selectedAction, setSelectedAction] = useState<RequestStatus | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<"all" | RequestStatus>(
    "all"
  );

  const [updateLeaveStatus] = useUpdateLeaveStatusMutation();
  if (!leaveRequests) {
    return;
  }

  const leaveTypeLabels: Record<string, string> = {
    paidLeave: "Цалинтай чөлөө",
    casualLeave: "Энгийн амралт",
    remoteWork: "Зайнаас ажилласан",
    annualLeave: "Ээлжийн амралт",
  };

  const convertedLeaveRequests: LeaveRequest[] = leaveRequests
    .map((req: any) => {
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
        createdAt: Number(req.createdAt),
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);

  const filters = [
    { key: "all", label: "Бүгд" },
    { key: "PENDING", label: "Хүлээгдэж буй" },
    { key: "APPROVED", label: "Зөвшөөрсөн" },
    { key: "REJECTED", label: "Татгалзсан" },
  ];
  const filteredRequestsEmployees = (() => {
    let filtered = convertedLeaveRequests;

    if (activeFilter !== "all") {
      filtered = filtered.filter((request) => request.status === activeFilter);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((request) =>
        request.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter === "all") {
      filtered = filtered.sort((a, b) => {
        if (a.status === "PENDING" && b.status !== "PENDING") return -1;
        if (a.status !== "PENDING" && b.status === "PENDING") return 1;
        return 0;
      });
    }

    return filtered;
  })();

  return (
    <div className="w-full bg-gray-100 min-h-screen p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Чөлөөний хүсэлтүүд
          </h1>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Ажилтан хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-amber-600 focus:outline-none focus:ring-1 focus:!ring-amber-500 focus:!border-amber-500 focus:!border-[1px] transition-all duration-200"
            />

            <Button className="bg-gradient-to-r from-orange-300 to-orange-500 hover:from-beige-500 hover:to-orange-600 text-white border-0">
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
                  ? "bg-gradient-to-r from-orange-300 to-orange-500 hover:from-beige-500 hover:to-orange-600 text-white border-0"
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
          {filteredRequestsEmployees.map((request) => {
            const StatusIcon = statusConfig[request.status].icon;

            return (
              <div
                key={request.id}
                className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="w-full flex items-start justify-between">
                  <div className="w-full flex items-start gap-4">
                    <Avatar className="w-12 h-12 bg-blue-100">
                      <AvatarFallback className="border-1 border-beige-300 bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium">
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
                          onClick={() => {
                            setSelectedRequestId(request.id);
                            setSelectedAction("APPROVED");
                            setDialogOpen(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Зөвшөөрөх
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedRequestId(request.id);
                            setSelectedAction("REJECTED");
                            setDialogOpen(true);
                          }}
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedAction === "APPROVED"
                ? "Та зөвшөөрөхдөө итгэлтэй байна уу?"
                : "Та татгалзахаасаа өмнө шалгана уу?"}
            </DialogTitle>
            <DialogDescription>
              Энэ үйлдлийг буцаах боломжгүй. Сайтар шалгана уу.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Үгүй
            </Button>
            <Button
              onClick={async () => {
                if (!selectedRequestId || !selectedAction) return;
                try {
                  await updateLeaveStatus({
                    variables: {
                      updateLeaveStatusId: selectedRequestId,
                      status: selectedAction as LeaveStatus,
                    },
                  });
                  toast.success(
                    selectedAction === "APPROVED"
                      ? "Амжилттай зөвшөөрлөө"
                      : "Амжилттай татгалзлаа"
                  );
                } catch (error) {
                  toast.error("Алдаа гарлаа");
                  console.error(error);
                } finally {
                  setDialogOpen(false);
                  setSelectedAction(null);
                  setSelectedRequestId(null);
                }
              }}
            >
              Тийм
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
