"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";
import { useEmployee } from "@/app/_context/employeeContext";

export default function LeaveRequestHistoryPage() {
  const { leaveRequests } = useLeaveRequest();
  const { currentUser } = useEmployee();

  const filteredLeaveRequests = leaveRequests?.filter(
    (request) => request.userId?._id === currentUser?._id
  );

  const sortedLeaveRequests = filteredLeaveRequests?.slice().sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    return Number(b.createdAt) - Number(a.createdAt);
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Зөвшөөрсөн
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Хүлээгдэж буй
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">
            <XCircle className="w-3 h-3 mr-1" />
            Татгалзсан
          </Badge>
        );
      default:
        return null;
    }
  };

  const mapLeaveTypeToMongolian = (type: string) => {
    switch (type) {
      case "paidLeave":
        return "Цалинтай чөлөө";
      case "casualLeave":
        return "Энгийн амралт";
      case "remoteWork":
        return "Зайнаас ажиллах";
      case "annualLeave":
        return "Ээлжийн амралт";
      default:
        return "Бусад";
    }
  };

  const approvedCount =
    filteredLeaveRequests?.filter((r) => r.status === "APPROVED").length ?? 0;
  const pendingCount =
    filteredLeaveRequests?.filter((r) => r.status === "PENDING").length ?? 0;
  const rejectedCount =
    filteredLeaveRequests?.filter((r) => r.status === "REJECTED").length ?? 0;

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Миний чөлөөний түүх
          </h1>
          <p className="text-gray-600">Таны бүх чөлөөний хүсэлтүүдийн түүх</p>
        </div>
        <Link href="/employee-leave-request">
          <Button className="bg-gradient-to-r from-orange-300 to-orange-500 hover:from-beige-500 hover:to-orange-600 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Шинэ хүсэлт
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Нийт чөлөөний өдөр</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {filteredLeaveRequests?.length}
            </p>
            <p className="text-sm text-gray-600">Ашигласан өдөр</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 rounded-xl flex items-center justify-center mx-auto mb-2">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {5 - (filteredLeaveRequests?.length || 0)}
            </p>
            <p className="text-sm text-gray-600">Үлдсэн өдөр</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">
            Чөлөөний хүсэлтүүдийн түүх
          </CardTitle>
          <CardDescription>
            Нийт {sortedLeaveRequests?.length} хүсэлт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedLeaveRequests?.map((request, index) => {
              const start = new Date(Number(request.startDate));
              const end = new Date(Number(request.endDate));
              const dateStr =
                start.toDateString() === end.toDateString()
                  ? start.toLocaleDateString("mn-MN")
                  : `${start.toLocaleDateString(
                      "mn-MN"
                    )} - ${end.toLocaleDateString("mn-MN")}`;
              const durationInDays =
                Math.ceil(
                  (Number(request.endDate) - Number(request.startDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1;
              const status = request.status.toLowerCase();
              const type = mapLeaveTypeToMongolian(request.LeaveType);

              return (
                <div
                  key={index}
                  className="p-4 rounded border border-gray-100 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-full">
                          <Calendar className="w-4 h-4 text-gray-500" />
                        </div>
                        <h3 className="font-semibold text-gray-900">{type}</h3>
                        {getStatusBadge(status)}
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {dateStr}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {durationInDays} өдөр
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Шалтгаан:</span>{" "}
                        {request.reason}
                      </p>
                      {request.rejectionReason && (
                        <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded mt-2">
                          <span className="font-medium">
                            Татгалзсан шалтгаан:
                          </span>{" "}
                          {request.rejectionReason}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Илгээсэн:{" "}
                      {new Date(Number(request.createdAt)).toLocaleDateString(
                        "mn-MN"
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
            <p className="text-sm text-gray-600">Зөвшөөрсөн хүсэлт</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            <p className="text-sm text-gray-600">Хүлээгдэж буй хүсэлт</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
            <p className="text-sm text-gray-600">Татгалзсан хүсэлт</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
