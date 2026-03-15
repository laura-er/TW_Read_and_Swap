import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    requiredRole?: 'admin';
    redirectTo?: string;
}

export function ProtectedRoute({
                                   requiredRole,
                                   redirectTo = '/sign-in',
                               }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    if (requiredRole === 'admin' && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}