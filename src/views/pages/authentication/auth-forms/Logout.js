import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`);
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        const allCookies = Cookies.get();
        for (const cookie in allCookies) {
          Cookies.remove(cookie);
        }
        navigate('/');
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;
