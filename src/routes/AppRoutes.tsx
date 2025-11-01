import { Route, Routes, Outlet } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/user/Register';
import Home from '../pages/user/Home';
import ManagerPost from '../pages/admin/ManagerPost';
import Header from '../layouts/Header';
import ManagerUsers from '../pages/admin/ManagerUser';
import ArticleDetail from '../pages/user/ArticleDetail';
import ProtectedRoute from './ProtectedRoutes';

// 1. Import Sidebar Dũng vừa chỉ định
import Sidebar from '../layouts/Sidebar'; 

// Layout chung cho người dùng (có Header)
const UserLayout = () => (
  <>
    <Header />
    <Outlet /> 
  </>
);

// 2. Sửa AdminLayout để dùng Sidebar
const AdminLayout = () => (
  <>
    <Header />
    <div className="d-flex">
      {/* Thêm Sidebar vào đây */}
      <Sidebar /> 
      {/* Outlet sẽ render ManagerUsers hoặc ManagerPost */}
      <Outlet /> 
    </div>
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Route User (Public) */}
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<ArticleDetail />} />
      </Route>

      {/* Route Auth (Không layout) */}
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      {/* Route Admin (Được bảo vệ) */}
      <Route element={<ProtectedRoute />}> 
        <Route element={<AdminLayout />}>  {/* Dùng Layout Admin mới */}
          <Route path='/admin/user-manager' element={<ManagerUsers />} />
          <Route path='/admin/post-manager' element={<ManagerPost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;