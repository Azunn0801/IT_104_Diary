import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"
import { getAuth, logout } from "../utils/auth"; 

const Header: React.FC = () => {
  const user = getAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (window.confirm("Are you sure want to log out?")) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="header-container">
      <header className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="logo-icon"></span>
            <span className="brand-name">RIKKEI_EDU_BLOG</span>
          </Link>

          <div className="collapse navbar-collapse justify-content-center">
            <form className="d-flex w-50">
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search for articles"
                aria-label="Search"
                id="headerSearch"
              />
              <button id="searchBtn" className="btn search-icon" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>

          <ul className="navbar-nav ms-auto">
            {!user && (
              <li className="nav-item auth-buttons">
                <Link className="btn btn-outline-primary me-2" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-primary" to="/login">
                  Sign In
                </Link>
              </li>
            )}

            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle p-0"
                  href="#"
                  id="headerDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    id="headerAvatar"
                    src={user.avatarUrl || '../assets/images/user.png'}
                    alt="Avatar"
                    className="profile-picture"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="headerDropdown">
                  <li className="dropdown-item-text text-center py-3">
                    <img
                      id="dropdownAvatar"
                      src={user.avatarUrl || '../assets/images/user.png'}
                      alt="Avatar"
                      width={64}
                      height={64}
                      className="rounded-circle mb-2"
                    />
                    <div id="dropdownName" className="fw-semibold">{user.fullName}</div>
                    <div id="dropdownEmail" className="text-muted small">{user.email}</div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link id="profileLink" className="dropdown-item" to="/admin/dashboard">
                      View profile
                    </Link>
                  </li>
                  <li>
                    <Link id="avatarLink" className="dropdown-item" to="/admin/dashboard">
                      Update avatar
                    </Link>
                  </li>
                  <li>
                    <Link id="passwordLink" className="dropdown-item" to="/admin/dashboard">
                      Change password
                    </Link>
                  </li>
                  
                  {user.role && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/user-manager">
                          Manage Users
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/post-manager">
                          Manage Articles
                        </Link>
                      </li>
                    </>
                  )}
                  
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" id="logoutToggle" onClick={handleLogout}>
                      Log out
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;