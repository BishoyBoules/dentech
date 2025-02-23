import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Don't redirect while loading to prevent flashing
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only redirect if we're sure the user is not authenticated
  if (!isAuthenticated || !user) {
    // Don't redirect if we're already on the login page
    if (location.pathname === '/login') {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = getDashboardPath(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

const getDashboardPath = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return '/admin';
    case UserRole.SECRETARY:
      return '/secretary';
    default:
      return '/dashboard';
  }
};
