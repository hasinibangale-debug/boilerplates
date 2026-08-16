import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RequestList from "./pages/RequestList";
// Placeholder views for your routes


const About = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-800">About Page</h1>
  </div>
);

const Requests = () => <div className="text-2xl font-bold text-gray-800">Requests Page</div>;
const Users = () => <div className="text-2xl font-bold text-gray-800">Users Page</div>;
const Reports = () => <div className="text-2xl font-bold text-gray-800">Reports Page</div>;
const Settings = () => <div className="text-2xl font-bold text-gray-800">Settings Page</div>;

const Profile = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
  </div>
);


  

function App() {
  const handleOpenAiBot = () => {
    alert('AI Bot clicked!');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation Bar */}
      <Navbar onOpenAiBot={handleOpenAiBot} />

      {/* Main Page Routing */}
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="requests" element={<RequestList />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;