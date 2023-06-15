import MainLayout from "./components/Layouts/MainLayout"
import ErrorLayout from "./components/Layouts/ErrorLayout"
import HomePage from './components/Pages/HomePage'
import AboutPage from './components/Pages/AboutPage'
import ContactPage from './components/Pages/ContactPage'
import PostPage from "./components/Pages/PostPage"
import TimerPage from "./components/Pages/TimerPage"

// Profile
import Login from './components/Pages/auth/users/Login'
import Register from './components/Pages/auth/users/Register'
import Profile from './components/Pages/auth/users/Profile'
import Password from './components/Pages/auth/users/Password'
import AdminPanel from "./components/Pages/auth/users/AdminPanel"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/timer" element={<TimerPage />}/>
        <Route path="/posts/:postid" element={<PostPage />}/>
        {/* Auth components */}
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/password" element={<Password />}/>
        <Route path="/adminpanel" element={<AdminPanel/>}/>

        <Route exact path="/" element={<HomePage />}/>
      </Route>
      <Route element={<ErrorLayout />}>
          <Route path="*" element={<p>Wygląda na to, że zagłądziłeś</p>}/>
      </Route>
    </Routes>
  </Router>
  )
}

export default App;