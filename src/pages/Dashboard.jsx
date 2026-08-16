import React from 'react';
import Card from '../components/Card';
import { mockRequests } from '../mock/data';
import { FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  // Dynamically calculate metrics from mock data
  const totalRequests = mockRequests.length;
  const completedRequests = mockRequests.filter((r) => r.status === 'Completed').length;
  const pendingRequests = mockRequests.filter((r) => r.status === 'Pending').length;
  const urgentRequests = mockRequests.filter((r) => r.priority === 'Urgent').length;

  const metrics = [
    {
      title: 'Total Requests',
      value: totalRequests.toString(),
      change: 'Total logged cases',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Completed',
      value: completedRequests.toString(),
      change: 'Successfully resolved',
      icon: CheckCircle2,
      color: 'text-green-600 bg-green-50',
    },
    {
      title: 'Pending',
      value: pendingRequests.toString(),
      change: 'Requires attention',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Urgent Cases',
      value: urgentRequests.toString(),
      change: 'High priority',
      icon: AlertCircle,
      color: 'text-red-600 bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor assistance requests and live status updates.
        </p>
      </div>

      {/* Grid of Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{item.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">{item.change}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Content Card: Render Requests List */}
      <Card
        title="Recent Requests"
        subtitle="Overview of recent user submissions"
        footer={<button className="text-blue-600 font-medium hover:underline text-xs">View all requests →</button>}
      >
        <div className="space-y-3">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 text-sm">{request.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {request.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{request.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-medium ${
                    request.priority === 'Urgent'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {request.priority}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    request.status === 'Approved'
                      ? 'bg-blue-100 text-blue-800'
                      : request.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;