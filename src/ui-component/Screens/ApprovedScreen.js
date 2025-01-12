import React from 'react';
import { ApprovedCard } from '../cards/index';

import { Box } from '@mui/material';

const ApprovedScreen = () => {
  const handleInitialCardSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%', width: '100%' }}>
        <ApprovedCard onSubmit={handleInitialCardSubmit} />
      </Box>
    </Box>
  );
};

export default ApprovedScreen;
