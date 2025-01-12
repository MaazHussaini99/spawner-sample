import React from 'react';
import { CheckedCard } from '../cards/index';

import { Box } from '@mui/material';

const CheckedScreen = () => {
  const handleInitialCardSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%', width: '100%' }}>
        <CheckedCard onSubmit={handleInitialCardSubmit} />
      </Box>
    </Box>
  );
};

export default CheckedScreen;
