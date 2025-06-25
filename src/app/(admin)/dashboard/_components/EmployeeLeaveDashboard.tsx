import { ChevronLeft, ChevronRight, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export default function EmployeeLeaveDashboard() {
  const leaveData = [
    {
      name: "Батбаяр",
      position: "Програм хөгжүүлэгч",
      hours: "36 цаг",
      days: "1.5 өдөр",
      initials: "Б",
    },
    {
      name: "Оюунбилэг",
      position: "Дизайнер",
      hours: "36 цаг",
      days: "1.5 өдөр",
      initials: "О",
    },
    {
      name: "Билгүүн",
      position: "Менежир",
      hours: "36 цаг",
      days: "1.5 өдөр",
      initials: "Б",
    },
  ];

  const paidLeaveData = [
    {
      name: "Аэжаргал",
      position: "Програм хөгжүүлэгч",
      hours: "36 цаг",
      days: "1.5 өдөр",
      initials: "А",
    },
    {
      name: "Сайнбаяр",
      position: "Дизайнер",
      hours: "36 цаг",
      days: "1.5 өдөр",
      initials: "С",
    },
    {
      name: "Мөнхмөнд",
      position: "Санхүүч",
      hours: "36 цаг",
      days: "1.5 өдөр",
      initials: "М",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 ">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Leave Taken Section */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">
                6-р сар челөө авсан
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaveData.map((employee, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-blue-100">
                    <div className=" rounded-full bg-blue-100  text-blue-600 font-medium ">
                      {employee.initials}
                    </div>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{employee.hours}</p>
                  <p className="text-sm text-gray-500">{employee.days}</p>
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-end">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-blue-700 p-0 h-auto text-sm font-normal"
              >
                Цааш нь
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Paid Leave Section */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-lg font-medium text-gray-900">
                6-р сар цалинтай челөө
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {paidLeaveData.map((employee, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-blue-100">
                    <div className="rounded-full bg-blue-100  text-blue-600 font-medium">
                      {employee.initials}
                    </div>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{employee.hours}</p>
                  <p className="text-sm text-gray-500">{employee.days}</p>
                </div>
              </div>
            ))}
            <div className="pt-2 flex justify-end">
              <Button
                variant="ghost"
                className="text-gray-600 text-sm hover:text-blue-700 p-0 h-auto font-normal"
              >
                Цааш нь
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
