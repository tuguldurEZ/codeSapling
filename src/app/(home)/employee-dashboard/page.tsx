"use client";
import { Clock, Send, CalendarDays, Banknote, TreePalm } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetLeaveRequestsByUserQuery } from "../../../../generated/client-types";
import { useEmployee } from "@/app/_context/employeeContext";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";
import Link from "next/link";

export default function EmployeeDashboard() {
  const { leaveRequests } = useLeaveRequest();
  const { currentUser } = useEmployee();

  const { data } = useGetLeaveRequestsByUserQuery({
    variables: { userId: currentUser?._id ?? "" },
    skip: !currentUser?._id,
  });

  const approvedCasualLeaveCount =
    data?.getLeaveRequestsByUser?.filter(
      (item) => item.LeaveType === "casualLeave" && item.status === "APPROVED"
    )?.length ?? 0;

  const approvedPaidLeaveCount =
    data?.getLeaveRequestsByUser?.filter(
      (item) => item.LeaveType === "paidLeave" && item.status === "APPROVED"
    )?.length ?? 0;

  const today = new Date();

  const todayStartUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  const todayEndUTC = todayStartUTC + 24 * 60 * 60 * 1000;

  const todayLeaveRequests = leaveRequests?.filter((item) => {
    const start = new Date(Number(item.startDate));
    const end = new Date(Number(item.endDate));

    const startUTC = Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate()
    );
    const endUTC = Date.UTC(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate()
    );

    return (
      startUTC <= todayEndUTC &&
      endUTC >= todayStartUTC &&
      item.status === "APPROVED"
    );
  });

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays
                    className="rounded-md w-10 h-10 p-2 fill-amber-300"
                    stroke="#525252"
                  />
                  <CardTitle className="text-base font-medium text-[#525252]">
                    Чөлөөний цаг
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-[18px] items-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {approvedCasualLeaveCount} өдөр
                    </div>
                    <div className="text-sm text-gray-500">Ашигласан</div>
                  </div>
                  <div className="w-[1px] h-[51px] bg-[#A3A3A3]"></div>
                  <div>
                    <div className="text-2xl font-bold">5 өдөр</div>
                    <div className="text-sm text-gray-500">Үлдсэн</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center gap-2">
                  <Banknote
                    className=" rounded-md w-10 h-10 p-2 text-amber-800 fill-green-400 "
                    fill="#171717"
                    stroke="#525252"
                  />
                  <CardTitle className="text-base font-medium">
                    Цалинтай ажилласан
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-[18px] items-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {approvedPaidLeaveCount} өдөр
                    </div>
                    <div className="text-sm text-gray-500">Ашигласан</div>
                  </div>
                  <div className="w-[1px] h-[51px] bg-[#A3A3A3]"></div>
                  <div>
                    <div className="text-2xl font-bold">5 өдөр</div>
                    <div className="text-sm text-gray-500">Үлдсэн</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center gap-2">
                  <TreePalm
                    className="rounded-md w-10 h-10 p-2 text-amber-800 fill-red-400 "
                    stroke="#525252"
                  />
                  <CardTitle className="text-base font-medium">
                    Ээлжийн амралт
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-[18px] items-center">
                  <div>
                    <div className="text-2xl font-bold">0 өдөр</div>
                    <div className="text-sm text-gray-500">Ашигласан</div>
                  </div>
                  <div className="w-[1px] h-[51px] bg-[#A3A3A3]"></div>
                  <div>
                    <div className="text-2xl font-bold">15 өдөр</div>
                    <div className="text-sm text-gray-500">Үлдсэн</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">
                    Өнөөдрийн чөлөөтэй ажилчид
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayLeaveRequests?.length === 0 ? (
                  <div className="text-gray-500 text-center">
                    Өнөөдөр чөлөөтэй ажилтан байхгүй байна
                  </div>
                ) : (
                  todayLeaveRequests?.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium">
                          <AvatarFallback>
                            {item.userId?.firstName?.[0]?.toUpperCase() ?? "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {item.userId?.firstName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.userId?.employeeRole}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {item.totalHours ? `${item.totalHours} цаг` : "-"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.totalHours
                            ? `${(item.totalHours / 8).toFixed(1)} өдөр`
                            : "-"}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock />
                  <CardTitle className="text-lg">
                    Миний чөлөөний хүсэлт
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                {data?.getLeaveRequestsByUser?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium">
                        <AvatarFallback>
                          {item.userId?.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{item.userId?.email}</div>
                        <div className="text-sm text-gray-500">
                          {item.LeaveType === "paidLeave"
                            ? "Цалинтай чөлөө"
                            : item.LeaveType === "annualLeave"
                            ? "Ээлжийн амралт"
                            : item.LeaveType === "remoteWork"
                            ? "Зайнаас ажиллах"
                            : "Чөлөө"}
                        </div>
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800 border-yellow-200"
                    >
                      {item.status === "PENDING"
                        ? "Хүлээгдэж буй"
                        : item.status === "APPROVED"
                        ? "Зөвшөөрсөн"
                        : item.status === "REJECTED"
                        ? "Татгалзсан"
                        : item.status}
                    </Badge>
                  </div>
                ))}

                <Link href="employee-leave-request">
                  <Button className="bg-gradient-to-br py-2 px-4 mt-4 rounded-full from-orange-300 to-orange-500 text-white font-medium">
                    <Send className="w-4 h-4 mr-2" />
                    Чөлөө хүсэх
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
