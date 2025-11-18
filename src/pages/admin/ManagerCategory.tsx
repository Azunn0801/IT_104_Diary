import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ManagerCategory.module.css"

const ManagerCategory: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedEntries = localStorage.getItem('entries');
    
    if (storedEntries) {
      setCategories(JSON.parse(storedEntries));
    } else {
      const defaultEntries = ["Nấu ăn", "IT"];
      setCategories(defaultEntries);
      localStorage.setItem('entries', JSON.stringify(defaultEntries));
    }
  }, []);

  const saveToLocalStorage = (updatedCategories: string[]) => {
    localStorage.setItem('entries', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };
  
  const handleAddCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;

    const updatedCategories = [...categories, name];
    saveToLocalStorage(updatedCategories);
    setNewCategoryName('');
    showToast("Add category successfully!");
  };

  const handleEditCategory = (index: number) => {
    if (window.confirm("Are you sure?")) {
      const currentName = categories[index];
      const updatedName = window.prompt("Edit new category name:", currentName)?.trim();
      
      if (updatedName && updatedName !== currentName) {
        const updatedCategories = [...categories];
        updatedCategories[index] = updatedName;
        saveToLocalStorage(updatedCategories);
        showToast("Update category successfully!");
      }
    }
  };

  const handleDeleteCategory = (index: number) => {
    if (window.confirm("Are you sure want to delete?")) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      saveToLocalStorage(updatedCategories);
      showToast("Delete category successfully!");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="d-flex">
      
      <div className="sidebar">
        <button className="sidebar-btn">
          <Link to="/admin/user-manager">📂 Manage Users</Link>
        </button>
        <button className="sidebar-btn">
          <Link to="/admin/entries-manager"><i className="fas fa-file"></i> Manage Entries</Link>
        </button>
        <button className="sidebar-btn">
          <Link to="/admin/post-manager"><i className="fas fa-newspaper"></i> Manage Article</Link>
        </button>
        <button className="sidebar-btn">
          <i className="fas fa-sign-out-alt"></i> Log out
        </button>
      </div>

      <div className="main-content flex-grow-1">
        <header className="navbar navbar-expand-lg navbar-light bg-white custom-navbar">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <span className="logo-icon"></span>
              <span className="brand-name">RIKKEI_EDU_BLOG</span>
            </a>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle p-0" href="#" id="headerDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img 
                    id="headerAvatar" 
                    src="/assets/images/user.png" 
                    alt="Avatar" 
                    className="profile-picture"
                    style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #ccc', borderRadius: '50%' }} 
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="headerDropdown">
                  <li className="dropdown-item-text text-center py-3">
                    <img id="dropdownAvatar" src="/assets/images/user.png" alt="Avatar" width="64" height="64" className="rounded-circle mb-2"/>
                    <div className="fw-semibold">Admin User</div>
                    <div className="text-muted small">admin@example.com</div>
                  </li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </header>

        <div className="p-3">
            <input 
                type="search" 
                className="form-control" 
                id="search-bar" 
                placeholder="Search Article Categories"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
        </div>

        <div className="category-section p-3">
            <h2 className="mb-3"><i className="fas fa-folder me-2" style={{color: 'orange'}}></i> Manage Categories</h2>
            
            <div className="mb-3">
                <label htmlFor="category-name" className="form-label">Category Name:</label>
                <div className="input-group mb-2">
                    <input type="text" className="form-control" id="category-name" placeholder="Enter category name" disabled />
                </div>
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
                    Add Category
                </button>
            </div>

            <div className="category-list">
                <h3>📋 Category List</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((cat, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{cat}</td>
                                <td>
                                    <button 
                                        className="btn btn-warning btn-sm edit-category me-2"
                                        onClick={() => handleEditCategory(index)}
                                    >
                                        Sửa
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm delete-category"
                                        onClick={() => handleDeleteCategory(index)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredCategories.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center">Không tìm thấy chủ đề nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      <div className="modal fade" id="addCategoryModal" tabIndex={-1} aria-labelledby="addCategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addCategoryModalLabel">🗂️ Thêm Category Mới</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <label htmlFor="new-category-name" className="form-label">Tên Category:</label>
                    <input 
                        type="text" 
                        id="new-category-name" 
                        className="form-control" 
                        placeholder="Nhập tên category"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        id="saveCategoryBtn"
                        data-bs-dismiss="modal"
                        onClick={handleAddCategory}
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
      </div>

      {toastMessage && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
            <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {toastMessage}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastMessage(null)}></button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default ManagerCategory;