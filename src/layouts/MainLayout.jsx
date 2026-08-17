import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * MainLayout Component
 * 
 * A simple layout component for main pages (public pages).
 * Includes a navbar and content area.
 * 
 * Use this layout for pages like Home, About, etc.
 * Use DashboardLayout for protected/dashboard pages.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}