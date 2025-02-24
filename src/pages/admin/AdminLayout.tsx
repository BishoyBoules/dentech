import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import SpecializationsPage from './SpecializationsPage';

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-semibold">Admin Dashboard</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/admin/specializations"
                  className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Specializations
                </Link>
                {/* Add more admin navigation links here */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="specializations" element={<SpecializationsPage />} />
            <Route path="" element={<Navigate to="specializations" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
