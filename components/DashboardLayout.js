"use client";

import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout flex">
      <Sidebar />
      <main className="flex-grow p-8 bg-lightBackground text-lightText">{children}</main>
    </div>
  );
};

export default DashboardLayout;
