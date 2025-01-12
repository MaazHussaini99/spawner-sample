import React, { useState } from 'react';
import { MultiStepNewCard, PDFViewerCard, NewDesignCard, MainCard } from '../cards/index';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const NewDesignNewScreen = () => {
  const [formData, setFormData] = useState(null);

  const handleInitialCardSubmit = (data) => {
    setFormData(data);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {!formData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          <NewDesignCard onSubmit={handleInitialCardSubmit} />
        </Box>
      ) : (
        <MainCard title="G.A. Drawing - New Design" content={false} sx={{ marginTop: '5%', marginLeft: '20px', width: '100%' }}>
          <Grid container spacing={2} sx={{ maxWidth: '100%', width: '100%' }}>
            <Grid item xs={9}>
              <PDFViewerCard />
            </Grid>
            <Grid item xs={3}>
              <MultiStepNewCard initialValues={formData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </Box>
  );
};

export default NewDesignNewScreen;
