"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Employee {
  name: string;
  role: string;
  hours?: number;
  days: number;
  avatar: string;
}

const remoteEmployees: Employee[] = [
  { name: "Батдорж", role: "Менежер", days: 0, avatar: "БД" },
  { name: "Уламбаяр", role: "Нярав", days: 0, avatar: "УБ" },
  { name: "Батбаяр", role: "Програм хөгжүүлэгч", days: 0, avatar: "ББ" },
];

const restEmployees: Employee[] = [
  { name: "Энхжин", role: "Менежер", days: 0, avatar: "ЭЖ" },
  { name: "Батбаяр", role: "Менежер", days: 0, avatar: "ББ" },
  { name: "Батбаяр", role: "Менежер", days: 0, avatar: "ББ" },
];

function SectionHeader({
  icon: Icon,
  title,
  onPrevious,
  onNext,
}: {
  icon: React.ComponentType<any>;
  title: string;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onPrevious}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onNext}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <div className="text-center p-4 rounded-lg bg-gray-50">
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mx-auto mb-2">
      {employee.avatar}
    </div>
    <h4 className="font-medium text-gray-900 mb-1">{employee.name}</h4>
    <p className="text-sm text-gray-500 mb-2">{employee.role}</p>
    <div className="text-2xl font-bold text-gray-900 mb-1">
      {employee.days} өдөр
    </div>
    <p className="text-xs text-gray-500">Энэ сарын нийт чөлөө</p>
  </div>
);

const EmployeeSection = ({
  title,
  icon,
  employees,
}: {
  title: string;
  icon: React.ComponentType<any>;
  employees: Employee[];
}) => (
  <Card>
    <CardHeader className="pb-4">
      <SectionHeader
        icon={icon}
        title={title}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
          Цааш нь
        </Button>
      </div>
    </CardContent>
  </Card>
);

const LeaveRequestHistory = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Чөлөөний товч мэдээлэл */}
      <div className="w-full flex flex-wrap gap-5 p-4">
        {["6 сар чөлөө авсан", "6 сар цалинтай чөлөө"].map((label, index) => (
          <div
            key={index}
            className="p-6 flex flex-col gap-5 rounded-lg bg-white w-[500px]"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <CalendarDays className="w-5 h-5" />
                <p className="font-medium text-[18px]">{label}</p>
              </div>
              <div className="flex gap-2">
                <button>
                  <ChevronLeft />
                </button>
                <button>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Зайнаас ажилласан хэсэг */}
      <EmployeeSection
        icon={Clock}
        title="6-р сар зайнаас ажилласан"
        employees={remoteEmployees}
      />

      {/* Ээлжийн амралт хэсэг */}
      <EmployeeSection
        icon={Users}
        title="6-р сар ээлжийн амралт"
        employees={restEmployees}
      />
    </div>
  );
};

export default LeaveRequestHistory;
