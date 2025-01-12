import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const requestInProgress = useRef(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const validateToken = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/auth/validate-token`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true
            }
          )
          .then((response) => {
            if (response.data.response.code === 'TOKEN_VALID') {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          })
          .catch(() => {
            setIsAuthenticated(false);
          });
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
        requestInProgress.current = false;
      }
    };

    if (token && !requestInProgress.current) {
      requestInProgress.current = true;
      validateToken();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
