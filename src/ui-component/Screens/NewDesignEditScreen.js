import React, { useState } from 'react';
import { MultiStepEditCard, PDFViewerCard, EditDesignCard, MainCard } from '../cards/index';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const NewDesignEditScreen = () => {
  const [formData, setFormData] = useState(null);

  const handleInitialCardSubmit = (data) => {
    setFormData(data);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      {!formData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
          <EditDesignCard onSubmit={handleInitialCardSubmit} />
        </Box>
      ) : (
        <MainCard title="G.A. Drawing - Edit" content={false} sx={{ marginTop: '5%', marginLeft: '20px', width: '100%' }}>
          <Grid container spacing={2} sx={{ maxWidth: '100%', width: '100%' }}>
            <Grid item xs={9}>
              <PDFViewerCard />
            </Grid>
            <Grid item xs={3}>
              <MultiStepEditCard initialValues={formData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </Box>
  );
};

export default NewDesignEditScreen;
