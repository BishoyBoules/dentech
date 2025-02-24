import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../types/user';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../pages/admin/AdminLayout';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const AppointmentsPage = lazy(() => import('../pages/AppointmentsPage'));
// const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const SecretaryDashboard = lazy(() => import('../pages/SecretaryDashboard'));
const UserDashboard = lazy(() => import('../pages/UserDashboard'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/secretary/*"
          element={
            <ProtectedRoute allowedRoles={[UserRole.SECRETARY]}>
              <SecretaryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={[UserRole.USER, UserRole.SECRETARY, UserRole.ADMIN]}>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={[UserRole.USER]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard or login */}
        {/* <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        /> */}

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
