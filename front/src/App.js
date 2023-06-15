import MainLayout from "./components/Layouts/MainLayout"
import ErrorLayout from "./components/Layouts/ErrorLayout"
import HomePage from './components/Pages/HomePage'
import AboutPage from './components/Pages/AboutPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/about" element={<AboutPage />}/>
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