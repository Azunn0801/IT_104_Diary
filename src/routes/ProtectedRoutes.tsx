import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '../types/User';

const AUTH_KEY = 'loggedInUser';

// Hàm helper để lấy thông tin user từ localStorage
const getAuth = (): User | null => {
    const user = localStorage.getItem(AUTH_KEY);
    if (user) {
        return JSON.parse(user) as User;
    }
    return null;
};

const ProtectedRoute: React.FC = () => {
    const user = getAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;