import React from "react";
import StatusDashboard from "./_components/StatusDashboard";
import RecentRequests from "./_components/RecentRequests";

const DashboardPage = () => {
  return (
    <div>
      <StatusDashboard />
      <RecentRequests />
    </div>
  );
};

export default DashboardPage;
