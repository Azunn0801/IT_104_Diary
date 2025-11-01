import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-btn">
        <Link to="/user_manager">📂 Manage Users</Link>
      </button>
      <button className="sidebar-btn">
        <Link to="/entries_manager">
          <i className="fas fa-file"></i> Manage Entries
        </Link>
      </button>
      <button className="sidebar-btn">
        <Link to="/article_manager">
          <i className="fas fa-newspaper"></i> Manage Article
        </Link>
      </button>
      <button className="sidebar-btn">
        <i className="fas fa-sign-out-alt"></i> Log out
      </button>
    </div>
  );
};

export default Sidebar;
