import React, { useEffect, useState } from "react";
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ManagerUser.css";
import { getAllUsers, updateUser } from "../../services/userService";
import type { User } from "../../types/User";
import { showToast } from "../../utils/toastHelper";

const PAGE_SIZE = 5;

const ManagerUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllUsers(currentPage, PAGE_SIZE, 'fullName', sortOrder);
        setUsers(response.data);
        setTotalItems(response.totalCount);
      } catch (err) {
        console.error("User error Occured", err);
        setError("Cannot load Users list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage, sortOrder]);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  const handleSort = () => {
    setSortOrder(currentOrder => (currentOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleToggleStatus = async (userToUpdate: User) => {
    setUsers(currentUsers =>
      currentUsers.map(u =>
        u.id === userToUpdate.id ? { ...u, isActive: !u.isActive } : u
      )
    );

    try {
      await updateUser(userToUpdate.id, { isActive: !userToUpdate.isActive });
      showToast("success", `User ${userToUpdate.fullName} has been updated.`);
    } catch (err) {
      showToast("error", "Failed to update user status.");
      setUsers(currentUsers =>
        currentUsers.map(u =>
          u.id === userToUpdate.id ? { ...u, isActive: userToUpdate.isActive } : u
        )
      );
    }
  };


  return (
    <div className="d-flex">
      <div className="main-content flex-grow-1">
        <div className="p-4">
          <div className="user-table-section">
            <h2>Manage Users</h2>
            <table className="table table-bordered table-hover align-middle mt-3">
              <thead className="table-light">
                <tr>
                  <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                    Name {sortOrder === 'asc' ? '🔼' : '🔽'}
                  </th>
                  <th>Status</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="text-center">Đang tải...</td></tr>
                ) : error ? (
                  <tr><td colSpan={5} className="text-center text-danger">{error}</td></tr>
                ) : users.length === 0 ? (
                   <tr><td colSpan={5} className="text-center">Không tìm thấy user nào.</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img 
                          src={user.avatarUrl} 
                          alt={user.fullName} 
                          width="40" height="40" 
                          className="rounded-circle me-2"
                          style={{ objectFit: 'cover' }}
                        />
                        {user.fullName}
                      </td>
                      <td>
                        {user.isActive ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        {user.isActive ? (
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => handleToggleStatus(user)}
                          >
                            Block
                          </button>
                        ) : (
                          <button 
                            className="btn btn-success btn-sm"
                            onClick={() => handleToggleStatus(user)}
                          >
                            Unblock
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={PAGE_SIZE}
                onChange={handlePageChange}
                showSizeChanger={false}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerUsers;