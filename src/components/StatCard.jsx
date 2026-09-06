import React from 'react';

const StatCard = ({ title, value, icon: Icon, description }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {description && (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      {Icon && (
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatCard;