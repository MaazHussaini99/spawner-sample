import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import Themes from './Themes';
import { IconMenu2 } from '@tabler/icons-react';

const Header = ({ handleLeftDrawerToggle, leftDrawerOpened }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
          height: '48px'
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              backgroundColor: isDarkMode ? 'rgb(41, 49, 79)' : 'rgb(237, 231, 246)',
              color: isDarkMode ? 'rgb(124, 77, 255)' : 'rgb(103, 58, 183)',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgb(124, 77, 255)' : 'rgb(94, 53, 177)',
                color: isDarkMode ? 'rgb(209, 196, 233)' : 'rgb(237, 231, 246)'
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            {leftDrawerOpened ? <IconMenu2 stroke={1.5} size="1.3rem" /> : <IconMenu2 stroke={1.5} size="1.3rem" />}
          </Avatar>
        </ButtonBase>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <Themes />
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func.isRequired,
  leftDrawerOpened: PropTypes.bool.isRequired
};
export default Header;
