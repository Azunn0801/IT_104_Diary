import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.module.css";
import { FaFile, FaSignOutAlt, FaFolder } from "react-icons/fa";
import { logout } from "../utils/auth";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure want to log out?")) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="sidebar bg-light p-3 border-end">
      <button className="sidebar-btn w-100 mb-2">
        <Link to="/admin/user-manager" className="text-decoration-none text-dark">
          <FaFolder className="me-2" /> Manage Users
        </Link>
      </button>
      
      <button className="sidebar-btn w-100 mb-2">
        <Link to="/admin/post-manager" className="text-decoration-none text-dark">
          <FaFile className="me-2" /> Manage Posts
        </Link>
      </button>

      <button className="sidebar-btn w-100" onClick={handleLogout}>
        <FaSignOutAlt className="me-2" /> Log out
      </button>
    </div>
  );
};

export default Sidebar;