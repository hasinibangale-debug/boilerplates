import React from 'react';

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}