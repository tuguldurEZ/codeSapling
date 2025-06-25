/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EmployeeLeaveDashboard from "./EmployeeLeaveDashboard";

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
  <div className="text-start w-[300px] p-4 rounded-lg border-gray-100 border-[1px] bg-white">
    <div className="flex">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-2 mb-2">
        {employee.avatar}
      </div>
      <div>
        <h4 className="font-medium text-gray-900 mb-1">{employee.name}</h4>
        <p className="text-sm text-gray-500 mb-2">{employee.role}</p>
      </div>
    </div>
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
  <Card className="ml-4 ">
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
      <div className="flex justify-end">
        <Button
          variant="ghost"
          className="text-gray-600 text-sm font-normal hover:text-blue-700"
        >
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
      <div className="">
        <EmployeeLeaveDashboard />
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
