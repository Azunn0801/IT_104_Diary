import { Route, Routes, Outlet } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/user/Register';
import Home from '../pages/user/Home';
import ManagerPost from '../pages/admin/ManagerPost';
import Header from '../layouts/Header';
import ManagerUsers from '../pages/admin/ManagerUser';
import ArticleDetail from '../pages/user/ArticleDetail'; 
import ProtectedRoute from './ProtectedRoutes';
import Sidebar from '../layouts/Sidebar'; 
import Dashboard from '../pages/admin/Dashboard';

const UserLayout = () => (
  <>
    <Header />
    <Outlet /> 
  </>
);

const AdminLayout = () => (
  <>
    <Header />
    <div className="d-flex">
      <Sidebar /> 
      <Outlet /> 
    </div>
  </>
);

function AppRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<ArticleDetail />} />
        <Route path='/admin/post-manager' element={<ManagerPost />} />
      </Route>

      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route element={<ProtectedRoute />}> 
        <Route element={<AdminLayout />}>  
          <Route path='/admin/user-manager' element={<ManagerUsers />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;