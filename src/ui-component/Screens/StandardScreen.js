import React, { useState, useEffect } from 'react';
import { MultiStepCard, InitialCard, MainCard } from '../cards/index';
import PDFAnnotator from '../cards/reuseable/PDFAnnotator.js';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import samplePdf from '../../assets/pdfs_layouts/Layout_1.pdf';

const StandardScreen = () => {
  const [formData, setFormData] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleInitialCardSubmit = (data) => {
    const drawingDetails = data.standardDrawing.drawingDetails[0];
    const billOfMaterials = data.standardDrawing.billOfMaterials;
    const connections = data.standardDrawing.connections;
    const revisions = data.standardDrawing.revisions;

    setFormData({
      ...drawingDetails,
      billOfMaterials,
      connections,
      revisions
    });
  };

  const handleFormDataUpdate = (updatedData) => {
    setFormData(updatedData);
  };

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await fetch(samplePdf);
      const arrayBuffer = await response.arrayBuffer();
      const pdfUint8Array = new Uint8Array(arrayBuffer);
      setPdfFile(pdfUint8Array);
    };

    fetchPdf();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '5px' }}>
      {!formData ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%', alignItems: 'center', width: '100%' }}>
          <InitialCard onSubmit={handleInitialCardSubmit} />
        </Box>
      ) : (
        <MainCard title="G.A. Drawing - Standard" content={false} sx={{ marginTop: '1%', marginLeft: '20px', width: '100%' }}>
          <Grid container spacing={2} sx={{ maxWidth: '100%', width: '100%' }}>
            <Grid item xs={10}>
              <PDFAnnotator pdfFile={pdfFile} currentStepData={formData} />
            </Grid>
            <Grid item xs={2}>
              <MultiStepCard initialValues={formData} onSubmit={handleFormDataUpdate} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </Box>
  );
};

export default StandardScreen;
