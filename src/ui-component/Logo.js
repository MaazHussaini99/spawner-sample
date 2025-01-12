// Logo.js
import React from 'react';
import { useTheme } from '@mui/material/styles';

// Import your logo images
import darkLogo from 'assets/images/logo/logo-dark.png';
import lightLogo from 'assets/images/logo/logo-light.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <img
      src={isDarkMode ? darkLogo : lightLogo}
      style={{ position: 'relative', top: '-13px' }}
      width="77px"
      height="72px"
      alt="LeakProof"
    />
  );
};

export default Logo;
