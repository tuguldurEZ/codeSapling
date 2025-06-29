"use client";

import React, { useState } from "react";
import { useGetUsersQuery } from "../../../../generated/client-types";
import { CalendarIcon } from "lucide-react";
import EmployeeDialog from "./_components/employeeDialog";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error, refetch } = useGetUsersQuery();

  if (loading) return;
  if (error)
    return <p className="px-6 py-4 text-red-500">Алдаа: {error.message}</p>;

  const users = data?.getUsers || [];

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

    return fullName.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="py-5 px-6 w-[78vw] m-auto flex mt-5 flex-col gap-5 bg-white h-[95vh] rounded-lg overflow-auto">
      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-xl ">Ажилтнуудын удирдлага</p>
        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-1 py-1 rounded-md outline-none"
          />

          <EmployeeDialog onCreated={refetch} />
        </div>
      </div>

      <table className="min-w-full table-auto border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-[#737373] text-base font-bold">
            <th className="min-w-[250px] px-4">Ажилтан</th>
            <th>Албан тушаал</th>
            <th>Ажилд орсон огноо</th>
            <th>Админ эрх</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user._id || index} className=" rounded-md">
              <td className="flex items-center gap-3 px-4 py-2">
                <div className="border-1 border-beige-300 bg-gradient-to-br py-2 px-4 rounded-full from-beige-400 to-orange-500 text-white font-medium">
                  {user?.firstName?.[0] || "A"}
                </div>

                <div>
                  <p className="font-semibold text-base">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-[#737373] text-sm font-normal">
                    {user.email}
                  </p>
                </div>
              </td>
              <td className="text-base font-semibold">
                {user?.employeeRole || "-"}
              </td>
              <td className="text-base font-semibold flex gap-2">
                <CalendarIcon size={20} className="mt-[1px]" />
                {user?.employedDate
                  ? new Date(Number(user.employedDate)).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        timeZone: "Asia/Ulaanbaatar",
                      }
                    )
                  : "Огноо байхгүй"}
              </td>
              <td>
                <span
                  className={`px-3 py-1 w-[94px] h-[32px]  rounded-full text-sm font-semibold ${
                    user?.role === "ADMIN"
                      ? "bg-red-500 text-white px-[18px] text-base font-semibold"
                      : user?.role === "USER"
                      ? "bg-[#DCFCE7] text-[#166434] py-[6px]  text-base font-semibold"
                      : "bg-gray-300 text-[#166434]"
                  }`}
                >
                  {user?.role === "ADMIN"
                    ? "Админ"
                    : user?.role === "USER"
                    ? "Ажилтан"
                    : "Тодорхойгүй"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesPage;
