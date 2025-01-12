import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useCustomTheme } from '../ThemeContext'; // Adjust the path based on your directory structure

const Themes = () => {
  const { mode, toggleTheme } = useCustomTheme();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={toggleTheme}>
        {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default Themes;
