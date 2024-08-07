// src/components/Dashboard.tsx

"use client";

import React from 'react';
import Sidebar from '../../app/dashboard-teacher/Sidebar';

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <h1>Bruhhhh </h1>
      </div>
    </div>
  );
};

export default Dashboard;
