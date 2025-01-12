import React, { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import MainCard from '../reuseable/MainCard'; // Adjust the import based on your project structure
import pdf from '../../../assets/pdfs/GA_Drawing.pdf';

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
          await pdfViewer.openPdfAsync(pdf); // Adjust the path to your PDF file
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

const ApprovedOACard = () => {
  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>G.A. Drawing - Review (Approval)</Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="large" sx={{ width: 150 }} variant="contained">
                Revert Back
              </Button>
              <Button size="large" sx={{ width: 150 }} variant="contained">
                Released
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

export default ApprovedOACard;
