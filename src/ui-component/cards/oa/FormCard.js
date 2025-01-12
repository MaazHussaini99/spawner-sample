import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import PropTypes from 'prop-types';
import pdf from '../../../assets/pdfs/GA_Drawing.pdf';

const FormCard = () => {
  const [formData, setFormCardData] = useState({
    poNo: '',
    poDate: null,
    ormNo: '',
    ormDate: null,
    productCode: '',
    engineer: ''
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (field, value) => {
    setFormCardData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <div id={containerId} style={{ height: '750px', width: '100%' }}></div>
      </Grid>
      <Grid item xs={3}>
        {activeStep === 0 ? (
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" textAlign={'center'}>
              Order Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="P.O. No."
                  value={formData.poNo}
                  onChange={(e) => handleChange('poNo', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="P.O. Date"
                    value={formData.poDate}
                    onChange={(newValue) => handleChange('poDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="O.R.M No."
                  value={formData.ormNo}
                  onChange={(e) => handleChange('ormNo', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="O.R.M Date"
                    value={formData.ormDate}
                    onChange={(newValue) => handleChange('ormDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="O.A No."
                  value={formData.ormNo}
                  onChange={(e) => handleChange('oaNo', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="O.A Date"
                    value={formData.ormDate}
                    onChange={(newValue) => handleChange('oaDate', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Product Code"
                  value={formData.productCode}
                  onChange={(e) => handleChange('productCode', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button onClick={handleNext} variant="contained" size="large" fullWidth>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Engineer"
                  value={formData.engineer}
                  onChange={(e) => handleChange('engineer', e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleBack} variant="outlined" size="large" fullWidth>
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={() => console.log('FormCard Submitted', formData)} variant="contained" size="large" fullWidth>
                  Approval
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

FormCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.bool,
  boxShadow: PropTypes.bool,
  sx: PropTypes.object
};

export default FormCard;
