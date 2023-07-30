import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const useAuthCheck = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState?.isAuthenticated) {
      navigate('/auth/login');
    }
  }, [authState?.isAuthenticated]);
};

export default useAuthCheck;
