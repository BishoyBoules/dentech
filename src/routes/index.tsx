import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserRole } from '../types/user';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../pages/admin/AdminLayout';
import SpecializationsPage from '../pages/admin/SpecializationsPage';
import ItemDetailsPage from '../pages/admin/ItemDetailsPage';
import AboutPage from '../pages/AboutPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import ItemsPage from '../pages/admin/ItemsPage';
import ListsPage from '../pages/admin/ListsPage';

const RegisterPage = lazy(() => import('../pages/RegisterPage'));
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
        {/* Root redirect */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin/" element={<AdminLayout />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/specializations" replace />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="lists" element={<ListsPage />} />
          <Route path="specializations" element={<SpecializationsPage />} />
          <Route path="items/:id" element={<ItemDetailsPage />} />
          <Route path="items/:id/sub-items/:subId" element={<ItemDetailsPage />} />
        </Route>

        {/* Protected secretary routes */}
        <Route
          path="/secretary"
          element={
            <ProtectedRoute allowedRoles={[UserRole.SECRETARY]}>
              <SecretaryDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected user routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={[UserRole.USER]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/admin/specializations" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
