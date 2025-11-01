import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/user/Register'
import Home from '../pages/user/Home'
import ManagerPost from '../pages/admin/ManagerPost'
import Header from '../layouts/Header'
import ManagerUsers from '../pages/admin/ManagerUser'

const HomeLayout = () => (
  <>
    <Header />
    <Home />
  </>
)

const ManagerUserLayout = () => (
  <>
    <Header />
    <ManagerUsers/>
  </>
)

const ManagerPostLayout = () => (
  <>
    <Header />
    <ManagerPost/>
  </>
)

function AppRoutes() {

  return (
    <>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route element={<ManagerUserLayout />}>
          <Route path='/admin/user-manager' element={<ManagerUsers />} />
        </Route>
        <Route element={<ManagerPostLayout />}>
          <Route path='/post-manager' element={<ManagerPost />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/article_manager' element={<ManagerPost />} />
        <Route path='/admin/user-manager' element={<ManagerUsers />} />
      </Routes>
    </>
  )
}

export default AppRoutes
