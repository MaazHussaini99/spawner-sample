import React, { useState } from 'react';
import { Box, Button, TextField, Grid } from '@mui/material';
import MainCard from '../reuseable/MainCard';
import PropTypes from 'prop-types';

const isFormComplete = (formData) => {
  return formData.gaDrawingNo && formData.gaDrawingNo.trim() !== '';
};

const NewCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    gaDrawingNo: ''
  });

  const handleChange = (event) => {
    const { value } = event.target;
    setFormData({ gaDrawingNo: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <MainCard title="G.A. Drawing - O.A" content={true} boxShadow={true} sx={{ width: '80%', maxWidth: '600px', margin: '0 auto' }}>
      <center>
        <Box sx={{ p: 4, justifyContent: 'center' }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="G.A. Drawing No."
                value={formData.gaDrawingNo}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item mt={5}>
              <Button onClick={handleSubmit} variant="contained" size="large" fullWidth disabled={!isFormComplete(formData)}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </center>
    </MainCard>
  );
};

NewCard.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewCard;
