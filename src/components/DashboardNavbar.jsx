import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex items-center space-x-3">
        <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
          HabitFlow <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">Dashboard</span>
        </Link>
      </div>

      {/* Right Side Controls / User Profile Placeholder */}
      <div className="flex items-center space-x-4">
        <button 
          aria-label="Notifications"
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          🔔
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium text-sm">
            U
          </div>
          <span className="text-sm font-medium text-gray-700">User</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;