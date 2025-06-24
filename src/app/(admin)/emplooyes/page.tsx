"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useGetUsersQuery } from "../../../../generated/client-types";

const EmployeesPage = () => {
  const { data, loading, error } = useGetUsersQuery();

  if (loading) return <p className="px-6 py-4">Уншиж байна...</p>;
  if (error)
    return <p className="px-6 py-4 text-red-500">Алдаа: {error.message}</p>;

  const users = data?.getUsers || [];

  return (
    <div className="py-5 px-6 w-full flex flex-col gap-5">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold text-xl">Ажилтнуудын удирдлага</p>
        <input
          type="text"
          placeholder="Хайх..."
          className="border border-gray-300 px-3 py-2 rounded-md outline-none"
        />
        <Button>+ Ажилтан нэмэх</Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-[#737373] font-bold flex justify-between">
          <p>Ажилтан</p>
        </div>

        {users.map((user, index) => (
          <div key={user._id || index}>
            <div className="flex gap-3 items-center">
              <div className="py-2 font-bold px-4 w-11 h-11 flex justify-center items-center rounded-full bg-[#DBE9FE] text-sm">
                {user?.firstName?.[0] || "A"}
              </div>
              <div>
                <p className="font-bold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[#737373]">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
