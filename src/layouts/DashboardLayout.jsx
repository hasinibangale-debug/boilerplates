import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';

/**
 * DashboardLayout Component
 * 
 * A responsive dashboard layout with a collapsible sidebar.
 * 
 * Customize the navigation items by modifying the navItems array below.
 * Each item should have:
 * - label: Display name (string)
 * - path: Route path (string)
 * - icon: Lucide React icon component
 * 
 * Add your dashboard pages as nested routes under /dashboard in App.jsx
 */
const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Customize your dashboard navigation items here
  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
    // Add more navigation items here
    // { label: 'Users', path: '/dashboard/users', icon: Users },
    // { label: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col justify-between ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Navigation Items */}
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Toggle Button */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-sm font-medium text-gray-600 transition-colors"
            >
              {isCollapsed ? (
                <>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs">Expand</span>
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;