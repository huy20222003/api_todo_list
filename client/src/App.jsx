import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashboard from './Pages/Todos/Dashboard';
import Profile from './Pages/Profile/Profile';
import Setting from './Pages/Profile/Setting';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/setting' element={<Setting />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
