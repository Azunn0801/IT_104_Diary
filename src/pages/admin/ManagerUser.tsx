import React, { useEffect, useState } from "react";
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ManagerUser.module.css";
import { getAllUsers } from "../../services/userService";
import type { User } from "../../types/User";

const PAGE_SIZE = 5;

const ManagerUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllUsers(currentPage, PAGE_SIZE);
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
  }, [currentPage]);

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
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
                  <th>Name</th>
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
                      <td>{user.role ? "Admin" : "User"}</td>
                      <td>
                        {user.isActive ? (
                          <button className="btn btn-danger btn-sm">Block</button>
                        ) : (
                          <button className="btn btn-success btn-sm">Unblock</button>
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