import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import { getAuth } from '../utils/auth'; 

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const currentUser = getAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.role) { 
    return <Navigate to="/" replace />; 
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh', width: '100%' }}>
      <Sidebar />
      <div className="flex-grow-1 p-0" style={{ backgroundColor: '#f8f9fa' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;