import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import MainCard from '../reuseable/MainCard';

import PropTypes from 'prop-types';
import pdf from '../../../assets/pdfs/GA_Drawing.pdf';

const EditOACard = () => {
  const [formData, setFormData] = useState({
    rev: '',
    details: '',
    zone: '',
    apvd: '',
    ecn: '',
    documentNumber: '',
    date: null
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const pdfFile = pdf;
  const [containerId, setContainerId] = useState('');

  useEffect(() => {
    const uniqueId = `pdf-container-${Date.now()}`;
    setContainerId(uniqueId);
  }, []);

  useEffect(() => {
    const initViewer = async () => {
      if (pdfFile && containerId) {
        try {
          const options = {
            containerSelector: `#${containerId}`,
            workerSource: 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js'
          };

          const pdfViewer = new TsPdfViewer(options);
          await pdfViewer.openPdfAsync(pdfFile);
        } catch (error) {
          console.error('Failed to initialize PDF viewer:', error);
        }
      }
    };

    initViewer();
  }, [pdfFile, containerId]);

  return (
    <MainCard title="G.A. Drawing - O.A Edit" sx={{ marginTop: '0%', marginLeft: '20px', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <div id={containerId} style={{ height: '750px', width: '100%' }}></div>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" textAlign={'center'}>
              Revisions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Rev"
                  value={formData.rev}
                  onChange={(e) => handleChange('rev', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Details"
                  value={formData.details}
                  onChange={(e) => handleChange('details', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Zone"
                  value={formData.zone}
                  onChange={(e) => handleChange('zone', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="APVD"
                  value={formData.apvd}
                  onChange={(e) => handleChange('apvd', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="ECN No."
                  value={formData.ecn}
                  onChange={(e) => handleChange('ecn', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Document No."
                  value={formData.documentNumber}
                  onChange={(e) => handleChange('documentNumber', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={(newValue) => handleChange('date', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={() => console.log('Revision Submitted', formData)} variant="contained" size="large" fullWidth>
                  Revision
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
};

EditOACard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.bool,
  boxShadow: PropTypes.bool,
  sx: PropTypes.object
};

export default EditOACard;
