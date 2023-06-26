import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashbroad from './Pages/Todos/Dashbroad';
import Profile from './Pages/Profile/Profile'

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/dashbroad' element={<Dashbroad />} />
          <Route path='/dashbroad/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
