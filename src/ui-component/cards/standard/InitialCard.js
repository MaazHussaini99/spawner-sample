import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Typography } from '@mui/material';
import MainCard from '../reuseable/MainCard';
import axiosInstance from '../../../utils/axiosInstance';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';

const InitialCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sealTypeId: null,
    typeID: null,
    sealSeries: '',
    shaftSize: ''
  });

  const [options, setOptions] = useState({
    sealTypes: [],
    equipmentTypes: [],
    sealSeries: []
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axiosInstance.get('/api/dash/standard-initial');
        const data = response.data.initialDetails;
        setOptions({
          sealTypes: data.sealTypes,
          equipmentTypes: data.equipmentTypes,
          sealSeries: data.sealSeries.map((item) => item.SealSeries)
        });
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (event, newValue, fieldName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: newValue ? (newValue.ValueID ? newValue.ValueID.toString() : newValue) : ''
    }));
  };

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await axiosInstance.post('/api/dash/standard', formData);

      if (response.status === 200) {
        onSubmit(response.data); // Pass the response data to the StandardScreen component
        setErrorMessage('');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.response) {
        setErrorMessage(error.response.data.response.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const isFormComplete = () => {
    return Object.values(formData).every((value) => value !== '' && value !== null);
  };

  return (
    <MainCard title="G.A. Drawing - Standard" content={true} boxShadow={true} sx={{ width: '80%', maxWidth: '600px', margin: '0 auto' }}>
      <center>
        <Box sx={{ p: 4, justifyContent: 'center' }}>
          <form onSubmit={handleSubmit}>
            {' '}
            {/* Ensure form submission is handled */}
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Autocomplete
                  disablePortal
                  freeSolo
                  options={options.sealTypes}
                  getOptionLabel={(option) => option.ValueName}
                  value={options.sealTypes.find((option) => option.ValueID === parseInt(formData.sealTypeId)) || null}
                  onChange={(event, newValue) => handleChange(event, newValue, 'sealTypeId')}
                  renderInput={(params) => <TextField {...params} label="Seal Type" variant="outlined" margin="normal" fullWidth />}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  disablePortal
                  freeSolo
                  options={options.equipmentTypes}
                  getOptionLabel={(option) => option.ValueName}
                  value={options.equipmentTypes.find((option) => option.ValueID === parseInt(formData.typeID)) || null}
                  onChange={(event, newValue) => handleChange(event, newValue, 'typeID')}
                  renderInput={(params) => <TextField {...params} label="Configuration" variant="outlined" margin="normal" fullWidth />}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  disablePortal
                  freeSolo
                  options={options.sealSeries}
                  getOptionLabel={(option) => option}
                  value={options.sealSeries.find((option) => option === formData.sealSeries) || ''}
                  onChange={(event, newValue) => handleChange(event, newValue, 'sealSeries')}
                  renderInput={(params) => <TextField {...params} label="Seal Series" variant="outlined" margin="normal" fullWidth />}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Shaft Size"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="shaftSize"
                  value={formData.shaftSize}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              {errorMessage && (
                <Grid item>
                  <Typography variant="body1" color="error" sx={{ mt: 1 }}>
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid item mt={1}>
                <Button type="submit" variant="contained" size="large" fullWidth disabled={!isFormComplete()}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </center>
    </MainCard>
  );
};

// Adding PropTypes validation
InitialCard.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default InitialCard;
