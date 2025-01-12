import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Autocomplete, Grid } from '@mui/material';

import MainCard from '../reuseable/MainCard'; // Adjust the import based on your project structure
import pdf from '../../../assets/pdfs/GA_Drawing.pdf';

const engineers = ['Engineer A', 'Engineer B', 'Engineer C']; // Example engineer names

const PDFViewerCard = () => {
  const [viewer, setViewer] = useState(null);
  const [containerId, setContainerId] = useState('');

  useEffect(() => {
    const uniqueId = `pdf-container-${Date.now()}`;
    setContainerId(uniqueId);
  }, []);

  useEffect(() => {
    const initViewer = async () => {
      if (containerId) {
        try {
          const options = {
            containerSelector: `#${containerId}`,
            workerSource: 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js'
          };

          const pdfViewer = new TsPdfViewer(options);
          await pdfViewer.openPdfAsync(pdf);
          setViewer(pdfViewer);
        } catch (error) {
          console.error('Failed to initialize PDF viewer:', error);
        }
      }
    };

    initViewer();
    return () => {
      viewer?.destroy();
    };
  }, [containerId, viewer]);

  return <div id={containerId} style={{ height: '750px', width: '100%' }}></div>;
};

const CheckedCard = () => {
  const [engineer, setEngineer] = useState('');

  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>G.A. Drawing - Review (Checked)</Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Autocomplete
                sx={{ width: 300 }}
                options={engineers}
                value={engineer}
                onChange={(event, newValue) => setEngineer(newValue)}
                renderInput={(params) => <TextField {...params} label="Engineer" variant="outlined" fullWidth />}
              />
              <Button size="medium" sx={{ width: 150 }} variant="contained">
                Revert Back
              </Button>
              <Button size="medium" sx={{ width: 150 }} variant="contained">
                Approval
              </Button>
            </Box>
          </Grid>
        </Grid>
      }
      content={true}
      boxShadow={true}
      sx={{ width: '100%', margin: '0 0 0 20px' }}
    >
      <Box>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <PDFViewerCard />
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default CheckedCard;
