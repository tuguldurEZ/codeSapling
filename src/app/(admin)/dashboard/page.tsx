import React from "react";
import StatusDashboard from "./_components/StatusDashboard";
import RecentRequests from "./_components/RecentRequests";
import LeaveRequestHistory from "./_components/LeaveRequestHistory";

const DashboardPage = () => {
  return (
    <div className="w-full bg-[#fefdfb]">
      <StatusDashboard />
      <RecentRequests />
      <LeaveRequestHistory />
    </div>
  );
};

export default DashboardPage;
