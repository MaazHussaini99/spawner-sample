import React, { useState } from 'react';
import { FormCard, NewCard, MainCard } from '../cards/index';
import { Box } from '@mui/material';

const OANewScreen = () => {
  const [formData, setFormData] = useState(null);

  const handleInitialCardSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {!formData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          <NewCard onSubmit={handleInitialCardSubmit} />
        </Box>
      ) : (
        <MainCard title="G.A. Drawing - O.A (New)" content={false} sx={{ marginTop: '5%', marginLeft: '20px', width: '100%' }}>
          <FormCard />
        </MainCard>
      )}
    </Box>
  );
};

export default OANewScreen;
