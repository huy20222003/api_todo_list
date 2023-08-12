import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashboard from './Pages/Todos/Dashboard';
import Profile from './Pages/User/Profile';
import Setting from './Pages/User/Setting';
import Labels from './Pages/User/Label';
import ResetPassword from './Pages/User/ResetPassword';
import VerifyCode from './Components/Form/VerifyCode/VerifyCode';
import ProtectedRoute from './router/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/user/profile" element={<Profile />} />
            <Route path="/dashboard/user/setting" element={<Setting />} />
            <Route path="/dashboard/user/labels" element={<Labels />} />
            <Route path="/user/reset-password" element={<ResetPassword />} />
          </Routes>
        </ProtectedRoute>
        <VerifyCode />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
