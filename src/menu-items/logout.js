// assets
import { IconLogout } from '@tabler/icons-react';

// constant
const icons = { IconLogout };

// ==============================|| LOGOUT MENU ITEM ||============================== //

const logout = {
  id: 'logout',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Logout',
      type: 'item',
      icon: icons.IconLogout,
      url: '/logout',
      breadcrumbs: false,
      onClick: async () => {
        try {
          await axiosInstance.post('/api/auth/logout', {});
          Cookies.remove('token');
          Cookies.remove('sessionInfo');
          navigate('/');
        } catch (error) {
          console.error('Logout error:', error);
        }
      }
    }
  ]
};

export default logout;
