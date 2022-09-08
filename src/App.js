import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './components/signup/index'
import Login from './components/login/index'
import PrivateRoutes from './utility/auth/PrivateRoutes'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
