"use client";

import React, { useState } from 'react';
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout flex flex-col md:flex-row bg-darkBackground text-darkText h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-grow p-4 md:p-8">
        <button onClick={toggleSidebar} className="text-2xl text-neonPink mb-4 md:hidden">&#9776;</button>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
