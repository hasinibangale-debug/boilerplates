import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Habits from './pages/Habits';
import Calendar from './pages/Calendar';
import Games from './pages/Games';

function App() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation Bar */}

      {/* Main Page Routing */}
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Routes - Add your protected pages here */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="habits" element={<Habits />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="games" element={<Games />} />
            </Route>
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;