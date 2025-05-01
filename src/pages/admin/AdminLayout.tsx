import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { UserRole } from '../../types/user';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const getLinkClassName = (path: string) => {
    const isActive = location.pathname === path;
    return `inline-flex items-center px-3 py-2 text-sm font-medium ${isActive
      ? 'text-indigo-600'
      : 'text-gray-500 hover:text-gray-700'
      }`;
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/admin" className="text-xl font-semibold text-gray-900">
                    Admin Dashboard
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Pricing Dropdown */}
                  <div className="relative group flex justify-center">
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 group-hover:text-indigo-600"
                    >
                      Pricing
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="hidden group-hover:block absolute z-10 mt-16 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link to="/admin/categories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600">Categories</Link>
                        <Link to="/admin/lists" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600">Lists</Link>
                        <Link to="/admin/items" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600">Items</Link>
                      </div>
                    </div>
                  </div>

                  {/* Patients Link */}
                  <Link
                    to="/admin/patients"
                    className={getLinkClassName('/admin/patients')}
                  >
                    Patients
                  </Link>
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
