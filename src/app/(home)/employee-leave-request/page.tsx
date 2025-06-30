"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarIcon,
  Home,
  Send,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEmployee } from "@/app/_context/employeeContext";
import { Loading } from "@/components/Loading";
import {
  LeaveType,
  useCreateLeaveRequestMutation,
} from "../../../../generated/client-types";
import { toast } from "sonner";
import { useLeaveRequest } from "@/app/_context/leaveRequestContext";

export default function LeaveRequestPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
  const [selectedView, setSelectedView] = useState("daily");
  const [reason, setReason] = useState<string>("");
  const [manager, setManager] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const { users } = useEmployee();
  const { currentUser } = useEmployee();
  const { refetch } = useLeaveRequest();

  const [createLeaveRequest] = useCreateLeaveRequestMutation({
    onCompleted: () => {
      toast.success("Амралтын хүсэлт амжилттай илгээгдлээ!");
    },
    onError: (error) => {
      toast.error(`Алдаа гарлаа: ${error.message}`);
    },
  });

  if (!users) {
    return <Loading />;
  }

  const admins = users?.filter((user) => user.role === "ADMIN");

  const handleSubmit = async () => {
    if (selectedDates.length === 0) {
      alert("Та дор хаяж нэг өдөр сонгоно уу.");
      return;
    }

    const sortedDates = [...selectedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );

    const startDate = sortedDates[0].toISOString();
    const endDate = sortedDates[sortedDates.length - 1].toISOString();
    if (!currentUser?._id || !reason || !manager) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    await createLeaveRequest({
      variables: {
        input: {
          userId: currentUser._id,
          reason: note,
          LeaveType: reason as LeaveType,
          approver: manager,
          notifyTo: selectedEmployees.map((i) => users[i]._id),
          startDate,
          endDate,
        },
      },
    });
    refetch();
  };

  const toggleHour = (hour: string) => {
    setSelectedHours((prev) =>
      prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
    );
  };
  const hourOptions = [
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDate - i;
      const fullDate = new Date(year, month - 1, dayNum);
      days.push({
        day: dayNum,
        isCurrentMonth: false,
        isToday: false,
        fullDate,
      });
    }

    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day);
      const isToday = fullDate.toDateString() === today.toDateString();
      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        fullDate,
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const fullDate = new Date(year, month + 1, day);
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        fullDate,
      });
    }

    return days;
  };

  const toggleDateSelection = (date: Date) => {
    const exists = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
    if (exists) {
      setSelectedDates(
        selectedDates.filter((d) => d.toDateString() !== date.toDateString())
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  const handleSelectAll = () => {
    if (selectedEmployees.length === users?.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(users?.map((_, index) => index));
    }
  };
  const handleEmployeeToggle = (index: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isAllSelected = selectedEmployees.length === users?.length;
  const isIndeterminate =
    selectedEmployees.length > 0 && selectedEmployees.length < users.length;

  return (
    <div className="min-h-screen  bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="bg-amber-200 rounded-md w-10 h-10 p-2 text-amber-800" />
                <span className="text-gray-700 font-medium">Чөлөөний цаг</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-gray-900">12 цаг</div>
                  <div className="text-sm text-gray-500">Ашигласан</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">20 цаг</div>
                  <div className="text-sm text-gray-500">Үлдсэн</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon className="bg-amber-100 rounded-md w-10 h-10 p-2 text-amber-600" />
                <span className="text-gray-700 font-medium">
                  Зайнаас ажилласан
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-gray-900">3 өдөр</div>
                  <div className="text-sm text-gray-500">Ашигласан</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5 өдөр</div>
                  <div className="text-sm text-gray-500">Үлдсэн</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Home className="bg-red-100 rounded-md w-10 h-10 p-2 text-amber-600" />
                <span className="text-gray-700 font-medium">
                  Ээлжийн амралт
                </span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold text-gray-900">0 өдөр</div>
                  <div className="text-sm text-gray-500">Ашигласан</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    15 өдөр
                  </div>
                  <div className="text-sm text-gray-500">Үлдсэн</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 border-[1px] bg-white p-4 rounded-xl">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* View Toggle */}
            <div className="flex border-beige-300 bg-gradient-to-br   from-beige-400 to-orange-500 rounded-full p-1">
              <button
                onClick={() => setSelectedView("daily")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedView === "daily"
                    ? "bg-white text-gray-900 shadow-sm"
                    : ""
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                Өдрөөр
              </button>
              <button
                onClick={() => setSelectedView("hourly")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedView === "hourly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-black"
                }`}
              >
                <Clock className="w-4 h-4" />
                Цагаар
              </button>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div>
                <Select onValueChange={setReason}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Чөлөөний төрөл" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casualLeave">Энгийн чөлөө</SelectItem>
                    <SelectItem value="paidLeave">Цалинтай чөлөө</SelectItem>
                    <SelectItem value="remoteWork">Зайнаас ажиллах</SelectItem>
                    <SelectItem value="annualLeave">Ээлжийн амралт</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedView === "hourly" ? (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[220px] justify-start"
                    >
                      {selectedHours.length > 0
                        ? selectedHours.join(", ")
                        : "Цаг сонгох"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[220px] p-2">
                    <div className="grid gap-1">
                      {hourOptions.map((hour) => (
                        <button
                          key={hour}
                          onClick={() => toggleHour(hour)}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100",
                            selectedHours.includes(hour) && "bg-blue-100"
                          )}
                        >
                          <span className="flex-1 text-left">{hour}</span>
                          {selectedHours.includes(hour) && (
                            <Check className="w-4 h-4 text-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              ) : null}
              <div>
                <Select onValueChange={setManager}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Удирдах албан тушаалтан" />
                  </SelectTrigger>
                  <SelectContent>
                    {admins?.map((admin) => (
                      <SelectItem key={admin._id} value={admin._id}>
                        {admin.lastName[0]}.{admin.firstName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нэмэлт мэдээлэл
                </label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Нэмэлт мэдээлэл оруулах..."
                  className="min-h-[240px]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="border border-gray-200 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateMonth("prev")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-semibold">
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={() => navigateMonth("next")}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const isSelected = selectedDates.some(
                      (d) => d.toDateString() === day.fullDate.toDateString()
                    );
                    const isPast = day.fullDate < today;

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (day.isCurrentMonth && !isPast) {
                            toggleDateSelection(day.fullDate);
                          }
                        }}
                        disabled={isPast}
                        className={`p-2 text-center text-sm rounded-lg transition-colors ${
                          day.isCurrentMonth
                            ? isPast
                              ? "text-gray-400 cursor-not-allowed"
                              : isSelected
                              ? "bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium"
                              : day.isToday
                              ? "bg-gray-300 text-black font-medium"
                              : "text-gray-900 hover:bg-gray-100"
                            : "text-gray-300"
                        }`}
                      >
                        {day.day}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 items-end flex flex-col">
            <Card className="border h-[438px] border-gray-200 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Мэдэгдэх ажилчид
                </h3>
                <div className="mb-4 flex gap-4 cursor-pointer">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    className={
                      isIndeterminate ? "data-[state=indeterminate]" : ""
                    }
                    {...(isIndeterminate && { "data-state": "indeterminate" })}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Бүгдийг сонгох
                  </label>
                </div>
                <div className="space-y-3">
                  {users?.slice(0, 3).map((employee, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Checkbox
                        id={`employee-${index}`}
                        checked={selectedEmployees.includes(index)}
                        onCheckedChange={() => handleEmployeeToggle(index)}
                      />
                      <Avatar className="bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium">
                        <AvatarFallback className="bg-blue-100 text-black text-sm font-medium">
                          Б
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.firstName}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-6"></div>
              </CardContent>
            </Card>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-br py-2 px-4 mt-4 rounded-full from-orange-300 to-orange-500 text-white font-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Илгээх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
