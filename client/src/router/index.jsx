import { createBrowserRouter, Outlet } from 'react-router-dom';
import Loader from '../Components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../Pages/Home';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Dashboard from '../Pages/Todos/Dashboard';
import Profile from '../Pages/User/Profile';
import Setting from '../Pages/User/Setting';
import Labels from '../Pages/User/Label';
import ResetPassword from '../Pages/User/ResetPassword';
import VerifyCode from '../Components/Form/VerifyCode/VerifyCode';
import { AuthProvider } from '../Context/AuthContext';
import { TodosProvider } from '../Context/TodosContext';
import { UserProvider } from '../Context/UserContext';
import { LabelsProvider } from '../Context/LabelsContext';
import ProtectedRoute from './ProtectedRoute';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <TodosProvider>
          <LabelsProvider>
            <Outlet />
          </LabelsProvider>
        </TodosProvider>
      </UserProvider>
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: 'auth/login',
        element: <Login />,
      },
      {
        path: 'auth/register',
        element: <Register />,
      },
      {
        path: 'user/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'user/profile',
            element: <Profile />,
          },
          {
            path: 'user/setting',
            element: <Setting />,
          },
          {
            path: 'user/label',
            element: <Labels />,
          },
        ],
      },
    ],
  },
]);

export default router;
