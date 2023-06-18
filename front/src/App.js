import MainLayout from "./components/Layouts/MainLayout"
import ErrorLayout from "./components/Layouts/ErrorLayout"
import HomePage from './components/Pages/HomePage'
import AboutPage from './components/Pages/AboutPage'
import PostPage from "./components/Pages/PostPage"

// Profile
import Login from './components/Pages/auth/users/Login'
import Register from './components/Pages/auth/users/Register'
import Profile from './components/Pages/auth/users/Profile'
import Password from './components/Pages/auth/users/Password'
import AdminPanel from "./components/Pages/auth/users/AdminPanel"
import EditUser from './components/Pages/auth/users/EditUser'
import CreatePosts from "./components/Pages/auth/posts/CreatePosts"
import Delete from "./components/Pages/auth/users/Delete"
import AdminPosts from './components/Pages/auth/posts/AdminPosts'

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ user, rediredtPath='/'}) => {
  if (!user) {
    return <Navigate to={rediredtPath} replace />;
  }
  return <Outlet />
};

function App() {
  const user = localStorage.getItem("token")
  return (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/posts/:postid" element={<PostPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        {/* Auth components */}
        <Route element={
        <ProtectedRoute user={user}/>}>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/user/edit" element={<EditUser />}/>
          <Route path="/user/password" element={<Password />}/>
          <Route path="/user/delete" element={<Delete />}/>
          <Route path="/password" element={<Password />}/>

          <Route path="/createpost" element={<CreatePosts/>}/>
          <Route path="/adminpanel" element={<AdminPanel/>}/>
          <Route path="/adminposts" element={<AdminPosts/>}/>
        </Route>
        {/* End Auth components */}
      </Route>
      <Route element={<ErrorLayout />}>
          <Route path="*" element={<p>Wygląda na to, że zagłądziłeś</p>}/>
      </Route>
    </Routes>
  </Router>
  )
}

export default App;