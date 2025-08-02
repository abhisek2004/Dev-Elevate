import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = '/login'
}) => {
  const { state } = useAuth();

  // if (requireAuth && !state.isAuthenticated) {
  //   return <Navigate to={redirectTo} replace />;
  // }

  // if (requireAdmin && (!state.user || state.user.role !== 'admin')) {
  //   return <Navigate to="/" replace />;
  // }

  // if (!requireAuth && state.isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;