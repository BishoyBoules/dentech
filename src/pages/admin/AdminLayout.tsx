import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { UserRole } from '../../types/user';

const AdminLayout: React.FC = () => {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/admin" className="text-xl font-semibold">
                    Admin Dashboard
                  </Link>
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
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
