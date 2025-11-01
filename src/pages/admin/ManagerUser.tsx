import React, { useEffect, useState } from "react";
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ManagerUser.module.css";
// 1. Import thêm 'updateUser'
import { getAllUsers, updateUser } from "../../services/userService";
import type { User } from "../../types/User";
// 2. Import toast Dũng đã tạo
import { showToast } from "../../utils/toastHelper";

const PAGE_SIZE = 5;

const ManagerUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // 3. Thêm state cho Sắp xếp
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 4. Cập nhật useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // 5. Truyền tham số sort vào API
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
  }, [currentPage, sortOrder]); // <-- 6. Thêm 'sortOrder' vào dependency

  const handlePageChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  // 7. Thêm hàm Sắp xếp
  const handleSort = () => {
    setSortOrder(currentOrder => (currentOrder === 'asc' ? 'desc' : 'asc'));
  };

  // 8. Thêm hàm Block/Unblock
  const handleToggleStatus = async (userToUpdate: User) => {
    // Cập nhật giao diện ngay lập tức (Optimistic UI)
    setUsers(currentUsers =>
      currentUsers.map(u =>
        u.id === userToUpdate.id ? { ...u, isActive: !u.isActive } : u
      )
    );

    try {
      // Gọi API trong nền
      await updateUser(userToUpdate.id, { isActive: !userToUpdate.isActive });
      showToast("success", `User ${userToUpdate.fullName} has been updated.`);
    } catch (err) {
      // Nếu API lỗi, trả lại trạng thái cũ
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
                  {/* 9. Thêm onClick Sắp xếp */}
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
                        {/* 10. Sửa 'user.status' thành 'user.isActive' */}
                        {user.isActive ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </td>
                      <td>{user.email}</td>
                       {/* 11. Sửa 'user.role' thành 'user.isAdmin' */}
                      <td>{user.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        {/* 12. Thêm onClick Block/Unblock */}
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