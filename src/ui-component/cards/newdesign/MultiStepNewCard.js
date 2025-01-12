import React, { useState, useEffect } from 'react';
import { Button, TextField, Autocomplete, Card, CardContent, Box, IconButton, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const steps = [
  'Mechanical Seal Details',
  'Order Details',
  'Customer / Equipment Details',
  'Operating Parameters',
  'Bill of Material',
  'Material Code',
  'API Plan Description',
  'API Plan Details',
  'Connection',
  'Revisions',
  'G.A. Drawing No',
  'Notes'
];

export default function MultiStepNewCard({ initialValues }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    sealSeries: '',
    sealSize: '',
    apiSealCode: '',
    supportSystemDrawingNo: '',
    drfNo: '',
    drfDate: null,
    apiPlan: '',
    fluidType: '',
    fluidName: '',
    fluidPressure: '',
    fluidTemp: '',
    flowRate: '',
    code: '',
    connectionDetails: '',
    connectionSize: '',
    connectionApiPlan: '',
    rev: '',
    revisionDetails: '',
    zone: '',
    apvd: '',
    ecn: '',
    documentNumber: '',
    revisionDate: null,
    gaDrawingDate: null,
    notes: ''
  });

  useEffect(() => {
    if (initialValues) {
      setFormValues((prevValues) => ({
        ...prevValues,
        ...initialValues
      }));
    }
  }, [initialValues]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleAutoCompleteChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleDateChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField
              label="Seal Series"
              value={formValues.sealSeries}
              onChange={(e) => handleChange('sealSeries', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="IB Seal Size"
              value={formValues.sealSize}
              onChange={(e) => handleChange('sealSize', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="OB Seal Size"
              value={formValues.sealSize}
              onChange={(e) => handleChange('sealSize', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField label="Seal Construction" value="" fullWidth margin="normal" />
            <TextField label="Shaft Size" value="" fullWidth margin="normal" />
            <TextField
              label="API Seal Code"
              value={formValues.apiSealCode}
              onChange={(e) => handleChange('apiSealCode', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Support System Drawing No."
              value={formValues.supportSystemDrawingNo}
              onChange={(e) => handleChange('supportSystemDrawingNo', e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <TextField
              label="DRF. No."
              value={formValues.drfNo}
              onChange={(e) => handleChange('drfNo', e.target.value)}
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="DRF Date"
                value={formValues.drfDate}
                onChange={(newValue) => handleDateChange('drfDate', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField label="Buyer" value="" fullWidth margin="normal" />
            <TextField label="User" value="" fullWidth margin="normal" />
            <TextField label="Equipment Type" value="" fullWidth margin="normal" />
            <TextField label="Equipment Make" value="" fullWidth margin="normal" />
            <TextField label="Equipment Model" value="" fullWidth margin="normal" />
            <TextField label="Seal Orientation" value="" fullWidth margin="normal" />
            <TextField label="Tag No." value="" fullWidth margin="normal" />
            <TextField label="Ref. Drawing No." value="" fullWidth margin="normal" />
          </Box>
        );
      case 3:
        return (
          <Box>
            <TextField label="Fluid Name" value="" fullWidth margin="normal" />
            <TextField label="Suction Pressure" value="" fullWidth margin="normal" />
            <TextField label="Discharge Pressure" value="" fullWidth margin="normal" />
            <TextField label="Box Pressure" value="" fullWidth margin="normal" />
            <TextField label="Temperature" value="" fullWidth margin="normal" />
            <TextField label="Viscosity" value="" fullWidth margin="normal" />
            <TextField label="Specific Gravity" value="" fullWidth margin="normal" />
            <TextField label="Head" value="" fullWidth margin="normal" />
            <TextField label="Vapor Pressure" value="" fullWidth margin="normal" />
            <TextField label="Speed" value="" fullWidth margin="normal" />
          </Box>
        );
      case 4:
        return (
          <Box>
            <TextField label="Sr. No." value="" fullWidth margin="normal" />
            <TextField label="Part No." value="" fullWidth margin="normal" />
            <TextField label="Description" value="" fullWidth margin="normal" />
            <TextField label="Material" value="" fullWidth margin="normal" />
            <TextField label="Qty" value="" fullWidth margin="normal" />
            <TextField label="Spare" value="" fullWidth margin="normal" />
            <TextField label="Item Code" fullWidth margin="normal" />
          </Box>
        );
      case 5:
        return (
          <Box>
            <TextField label="Inbound" value="" fullWidth margin="normal" />
            <TextField label="Outbound" value="" fullWidth margin="normal" />
          </Box>
        );
      case 6:
        return (
          <Box>
            <Autocomplete
              disablePortal
              options={['Plan A', 'Plan B', 'Plan C']}
              renderInput={(params) => <TextField {...params} label="API Plan" />}
              onChange={(event, newValue) => handleAutoCompleteChange('apiPlan', newValue)}
              value={formValues.apiPlan}
            />
            <TextField label="Description" value="" fullWidth margin="normal" />
          </Box>
        );
      case 7:
        return (
          <Box>
            <TextField
              label="Fluid Type"
              value={formValues.fluidType}
              onChange={(e) => handleChange('fluidType', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fluid Name"
              value={formValues.fluidName}
              onChange={(e) => handleChange('fluidName', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fluid Pressure"
              value={formValues.fluidPressure}
              onChange={(e) => handleChange('fluidPressure', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fluid Temp."
              value={formValues.fluidTemp}
              onChange={(e) => handleChange('fluidTemp', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Flow Rate"
              value={formValues.flowRate}
              onChange={(e) => handleChange('flowRate', e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 8:
        return (
          <Box>
            <TextField
              label="Code"
              value={formValues.code}
              onChange={(e) => handleChange('code', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Details"
              value={formValues.connectionDetails}
              onChange={(e) => handleChange('connectionDetails', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Size"
              value={formValues.connectionSize}
              onChange={(e) => handleChange('connectionSize', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="API Plan"
              value={formValues.connectionApiPlan}
              onChange={(e) => handleChange('connectionApiPlan', e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 9:
        return (
          <Box>
            <TextField label="Rev" value={formValues.rev} onChange={(e) => handleChange('rev', e.target.value)} fullWidth margin="normal" />
            <TextField
              label="Details"
              value={formValues.revisionDetails}
              onChange={(e) => handleChange('revisionDetails', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Zone"
              value={formValues.zone}
              onChange={(e) => handleChange('zone', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="APVD"
              value={formValues.apvd}
              onChange={(e) => handleChange('apvd', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="ECN #"
              value={formValues.ecn}
              onChange={(e) => handleChange('ecn', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Document #"
              value={formValues.documentNumber}
              onChange={(e) => handleChange('documentNumber', e.target.value)}
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={formValues.revisionDate}
                onChange={(newValue) => handleDateChange('revisionDate', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        );
      case 10:
        return (
          <Box>
            <TextField label="Drawing By Name" value="" fullWidth margin="normal" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={formValues.gaDrawingDate}
                onChange={(newValue) => handleDateChange('gaDrawingDate', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
            <TextField label="Revision" value="" fullWidth margin="normal" />
            <TextField label="Issue" value="" fullWidth margin="normal" />
            <TextField label="Sheet Size" value="" fullWidth margin="normal" />
            <TextField label="Scale" value="" fullWidth margin="normal" />
            <TextField label="Weight" value="" fullWidth margin="normal" />
            <TextField label="Sheet No." value="" fullWidth margin="normal" />
          </Box>
        );
      case 11:
        return (
          <Box>
            <TextField label="As Built" value="" fullWidth margin="normal" />
            <TextField label="Location Plate removal" value="" fullWidth margin="normal" />
            <TextField label="Set screw tightening" value="" fullWidth margin="normal" />
            <TextField label="Process side" value="" fullWidth margin="normal" />
            <TextField label="Atmospheric side" value="" fullWidth margin="normal" />
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton onClick={handleBack} disabled={activeStep === 0}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h4">{steps[activeStep]}</Typography>
        <IconButton onClick={handleNext} disabled={activeStep === steps.length - 1}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Card>
        <CardContent>
          <Box sx={{ overflowY: 'auto' }}>{getStepContent(activeStep)}</Box>
        </CardContent>
      </Card>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'center' }}>
        {activeStep === steps.length - 1 ? (
          <Button size="large" fullWidth onClick={handleReset} variant="contained">
            Generate
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

MultiStepNewCard.propTypes = {
  initialValues: PropTypes.object
};
