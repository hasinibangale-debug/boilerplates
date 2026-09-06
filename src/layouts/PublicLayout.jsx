import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Public Navigation Bar */}
      <Navbar />

      {/* Main Content Area for Public Pages (Home, Login, Register) */}
      <main className="max-w-7xl mx-auto py-6 px-4 flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;