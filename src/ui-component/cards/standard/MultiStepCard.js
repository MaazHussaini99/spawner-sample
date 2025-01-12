import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Card, CardContent, Box, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, isValid, parseISO } from 'date-fns';

const steps = [
  'Mechanical Seal Details',
  'Material Code',
  'Order Details',
  'More Order Details',
  'API Plan Description',
  'API Plan Details',
  'Operating Parameters',
  'Customer/Equipment Details',
  'Bill Of Materials',
  'Connections',
  'Revisions'
];

const MultiStepCard = ({ initialValues, onSubmit }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveChanges = () => {
    onSubmit(formValues);
  };

  const handleChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
  };

  const formatAndSetDate = (field, value) => {
    const formattedDate = value && isValid(value) ? format(value, 'MM-dd-yyyy') : null;
    handleDateChange(field, formattedDate);
  };

  const handleDateChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value
    }));
  };

  const [formValues, setFormValues] = useState({
    ...initialValues,
    bomRows: initialValues.bomRows || []
  });
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleRowSelection = (event, selectedIndex) => {
    setSelectedRowIndex(selectedIndex);
  };

  const handleRowChange = (arrayName, index, field, value) => {
    const updatedRows = formValues[arrayName].map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setFormValues({ ...formValues, [arrayName]: updatedRows });
  };

  const addNewRow = (arrayName) => {
    const newRow = { SR_NO: '', PART_NO: '', ITEM_CODE: '', DESCRIPTION: '', MATERIAL: '', QTY: '', SPARE: '' };
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [arrayName]: [...prevFormValues[arrayName], newRow]
    }));
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <TextField label="Seal Series" value={formValues.SEAL_SERIES || ''} InputProps={{ readOnly: true }} fullWidth margin="normal" />
            <TextField
              label="Seal Construction"
              value={formValues.SEAL_CONSTRUCTION || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
            <TextField label="Shaft Size" value={formValues.SHAFT_SIZE || ''} InputProps={{ readOnly: true }} fullWidth margin="normal" />
            <TextField
              label="IB Seal Size"
              value={formValues.IB_SEAL_SIZE || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
            <TextField
              label="OB Seal Size"
              value={formValues.OB_SEAL_SIZE || ''}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Inbound
            </Typography>
            <Grid container spacing={2}>
              {[...Array(6)].map((_, i) => (
                <Grid item xs={4} key={i}>
                  <TextField label={`Val ${i + 1}`} value={formValues[`MT_IB_V${i + 1}`] || ''} fullWidth margin="normal" />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Outbound
            </Typography>
            <Grid container spacing={2}>
              {[...Array(6)].map((_, i) => (
                <Grid item xs={4} key={i}>
                  <TextField label={`Val ${i + 1}`} value={formValues[`MT_OB_V${i + 1}`] || ''} fullWidth margin="normal" />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <TextField label="DRF. No." value={formValues.DRF_NO || ''} fullWidth margin="normal" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="DRF Date"
                format="dd-MM-yyyy"
                value={formValues.DRF_DATE ? parseISO(formValues.DRF_DATE) : null}
                onChange={(newValue) => formatAndSetDate('DRF_DATE', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
            <TextField label="PO. No." value={formValues.P_O_NO || ''} fullWidth margin="normal" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="PO. Date"
                format="dd-MM-yyyy"
                value={formValues.P_O_DATE ? parseISO(formValues.P_O_DATE) : null}
                onChange={(newValue) => formatAndSetDate('P_O_DATE', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
            <TextField
              label="OFM. No."
              value={formValues.OFM_NO || ''}
              onChange={(e) => handleChange('OFM_NO', e.target.value)}
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="OFM Date"
                format="dd-MM-yyyy"
                value={formValues.OFM_DATE ? parseISO(formValues.OFM_DATE) : null}
                onChange={(newValue) => formatAndSetDate('OFM_DATE', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
            <TextField label="OA. No." value={formValues.O_A_NO || ''} fullWidth margin="normal" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="OA Date"
                format="dd-MM-yyyy"
                value={formValues.O_A_DATE ? parseISO(formValues.O_A_DATE) : null}
                onChange={(newValue) => formatAndSetDate('O_A_DATE', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
            <TextField label="Created By" value={formValues.DRWN || ''} fullWidth margin="normal" />
            <TextField label="Checked By" value={formValues.CHKD || ''} fullWidth margin="normal" />
            <TextField label="Approved By" value={formValues.APVD || ''} fullWidth margin="normal" />
          </Box>
        );
      case 3:
        return (
          <Box>
            <TextField label="Drawing Number" value={formValues.DWG_NO || ''} fullWidth margin="normal" />
            <TextField label="Revision" value={formValues.REV || ''} fullWidth margin="normal" />
            <TextField label="Issue" value={formValues.ISSUE || ''} fullWidth margin="normal" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Drawing Date"
                format="dd-MM-yyyy"
                value={formValues.DATE ? parseISO(formValues.DATE) : null}
                onChange={(newValue) => formatAndSetDate('DATE', newValue)}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </LocalizationProvider>
            <TextField label="Scale" value={formValues.SCALE || ''} fullWidth margin="normal" />
            <TextField label="Weight" value={formValues.WGT || ''} fullWidth margin="normal" />
            <TextField label="Sheet" value={formValues.SHEET || ''} fullWidth margin="normal" />
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
              1st API
            </Typography>
            <TextField label="Plan" value={formValues.api || ''} fullWidth margin="normal" />
            <TextField label="Description" value={formValues.firstApiPlanDesc || ''} fullWidth margin="normal" multiline rows={3} />
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
              2nd API
            </Typography>
            <TextField label="Plan" value={formValues.secondApiPlan || ''} fullWidth margin="normal" />
            <TextField label="Description" value={formValues.secondApiPlanDesc || ''} fullWidth margin="normal" multiline rows={3} />
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
              3rd API
            </Typography>

            <TextField label="Plan" value={formValues.thirdApiPlan || ''} fullWidth margin="normal" />
            <TextField label="Description" value={formValues.thirdApiPlanDesc || ''} fullWidth margin="normal" multiline rows={3} />
          </Box>
        );
      case 5:
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
              API Plan
            </Typography>
            <Autocomplete
              disablePortal
              options={['Plan A', 'Plan B', 'Plan C']}
              renderInput={(params) => <TextField {...params} label="apiPlans" />}
              value={formValues.apiPlans || ''}
            />
            <TextField label="Fluid Type" value={formValues.FLUID_TYPE || ''} fullWidth margin="normal" />
            <TextField label="Fluid Name" value={formValues.FLUID || ''} fullWidth margin="normal" />
            <TextField label="Fluid Pressure" value={formValues.FLUID_PR || ''} fullWidth margin="normal" />
            <TextField label="Fluid Temp." value={formValues.FLUID_TEMP || ''} fullWidth margin="normal" />
            <TextField label="Flow Rate" value={formValues.FLOW_RATE || ''} fullWidth margin="normal" />
          </Box>
        );
      case 6:
        return (
          <Box>
            <TextField label="Suction Pressure" value={formValues.SUCPR_MAX || ''} fullWidth margin="normal" />
            <TextField label="Discharge Pressure" value={formValues.DISCPR_MAX || ''} fullWidth margin="normal" />
            <TextField label="Stuffing Box Pressure" value={formValues.BOXPR_MAX || ''} fullWidth margin="normal" />
            <TextField label="Vessel Pressure" value={formValues.VESPR_MAX || ''} fullWidth margin="normal" />
            <TextField label="RPM" value={formValues.RPM || ''} fullWidth margin="normal" />
            <TextField label="Fluid" value={formValues.FLUID || ''} fullWidth margin="normal" />
            <TextField label="Temperature" value={formValues.TEMP_MAX || ''} fullWidth margin="normal" />
            <TextField label="Viscosity" value={formValues.VISCOSITY || ''} fullWidth margin="normal" />
            <TextField label="SP. GR." value={formValues.SP_GR || ''} fullWidth margin="normal" />
            <TextField label="Vapour Pressure" value={formValues.VAP_PR || ''} fullWidth margin="normal" />
          </Box>
        );
      case 7:
        return (
          <Box>
            <TextField label="Buyer" value={formValues.BUYER || ''} fullWidth margin="normal" />
            <TextField label="User" value={formValues.ENDUSER || ''} fullWidth margin="normal" />
            <TextField label="Equipment Type" value={formValues.EQPT_TYPE || ''} fullWidth margin="normal" />
            <TextField label="Equipment Make" value={formValues.EQPT_MAKE || ''} fullWidth margin="normal" />
            <TextField label="Equipment Model" value={formValues.EQPT_MODEL || ''} fullWidth margin="normal" />
            <TextField label="Seal Orientation" value={formValues.SEAL_ORIENT || ''} fullWidth margin="normal" />
            <TextField label="Tag No." value={formValues.TAG_NO || ''} fullWidth margin="normal" />
            <TextField label="Ref. Drawing No." value={formValues.REFDRG_NO || ''} fullWidth margin="normal" />
          </Box>
        );
      case 8:
        return (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Autocomplete
                options={formValues.bomRows.map((row, index) => ({
                  label: row.SR_NO || `Row ${index + 1}`, // Use SR_NO or fallback to Row index
                  id: index // Ensuring the key is unique
                }))}
                renderInput={(params) => <TextField {...params} label="Select SR NO" />}
                onChange={(event, newValue) => handleRowSelection(event, newValue?.id)} // Handle selection based on unique id
                getOptionLabel={(option) => option.label || ''} // Display the SR_NO
                value={selectedRowIndex !== null ? formValues.bomRows[selectedRowIndex]?.SR_NO : ''}
                isOptionEqualToValue={(option, value) => option.id === value.id} // Ensuring correct comparison
              />
            </Box>
            {selectedRowIndex !== null && formValues.bomRows[selectedRowIndex] && (
              <Grid container spacing={2} direction="row">
                <Grid item xs={2}>
                  <TextField
                    label="SR. NO"
                    value={formValues.bomRows[selectedRowIndex].SR_NO}
                    onChange={(e) => handleRowChange('bomRows', selectedRowIndex, 'SR_NO', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="PART NO"
                    value={formValues.bomRows[selectedRowIndex].PART_NO}
                    onChange={(e) => handleRowChange('bomRows', selectedRowIndex, 'PART_NO', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="ITEM CODE"
                    value={formValues.bomRows[selectedRowIndex].ITEM_CODE || ''}
                    onChange={(e) => handleRowChange('bomRows', selectedRowIndex, 'ITEM_CODE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="DESCRIPTION"
                    value={formValues.bomRows[selectedRowIndex].DESCRIPTION}
                    onChange={(e) => handleRowChange('bomRows', selectedRowIndex, 'DESCRIPTION', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="MATERIAL"
                    value={formValues.bomRows[selectedRowIndex].MATERIAL}
                    onChange={(e) => handleRowChange('bomRows', selectedRowIndex, 'MATERIAL', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    label="QTY."
                    value={formValues.bomRows[selectedRowIndex].QTY}
                    onChange={(e) => handleRowChange('bomRows', selectedRowIndex, 'QTY', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Autocomplete
                    disablePortal
                    options={['Yes', 'No']}
                    renderInput={(params) => <TextField {...params} label="SPARE" />}
                    onChange={(event, newValue) => handleRowChange('bomRows', selectedRowIndex, 'SPARE', newValue)}
                    value={formValues.bomRows[selectedRowIndex].SPARE ? 'Yes' : 'No'}
                  />
                </Grid>
              </Grid>
            )}
            <Button variant="contained" color="primary" onClick={() => addNewRow('bomRows')} sx={{ mt: 2 }}>
              Add Row
            </Button>
          </Box>
        );
      case 9:
        return (
          <Box>
            {formValues.bomRows.map((row, index) => (
              <Grid container spacing={2} key={index} direction="column">
                <Grid item>
                  <TextField
                    label="Code"
                    value={row.CODE}
                    onChange={(e) => handleRowChange(index, 'CODE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Detail"
                    value={row.DETAIL}
                    onChange={(e) => handleRowChange(index, 'DETAIL', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Description"
                    value={row.SIZE}
                    onChange={(e) => handleRowChange(index, 'SIZE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <Autocomplete
                    disablePortal
                    options={['Plan A', 'Plan B', 'Plan C']}
                    renderInput={(params) => <TextField {...params} label="apiPlans" />}
                    value={formValues.apiPlans || ''}
                  />
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" color="primary" onClick={addNewRow} sx={{ mt: 2 }}>
              Add Row
            </Button>
          </Box>
        );
      case 10:
        return (
          <Box>
            {formValues.bomRows.map((row, index) => (
              <Grid container spacing={2} key={index} direction="column">
                <Grid item>
                  <TextField
                    label="Revision"
                    value={row.REV}
                    onChange={(e) => handleRowChange(index, 'REV', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Details"
                    value={row.APVD}
                    onChange={(e) => handleRowChange(index, 'APVD', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Zone"
                    value={row.ZONE}
                    onChange={(e) => handleRowChange(index, 'SIZE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Approved By"
                    value={row.APVD}
                    onChange={(e) => handleRowChange(index, 'SIZE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Engineering Change Notification Number"
                    value={row.ECN}
                    onChange={(e) => handleRowChange(index, 'SIZE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Document Number"
                    value={row.DOCUMENT}
                    onChange={(e) => handleRowChange(index, 'SIZE', e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Drawing Date"
                      value={formValues.DATE || ''}
                      onChange={(newValue) => handleDateChange('DATE', newValue)}
                      slots={{ textField: TextField }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          margin: 'normal'
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" color="primary" onClick={addNewRow} sx={{ mt: 2 }}>
              Add Row
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
          {steps[activeStep]}
        </Typography>
        <Box sx={{ overflowY: 'auto', mb: 2 }}>{getStepContent(activeStep)}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button onClick={handleBack} disabled={activeStep === 0} variant="contained">
            Previous
          </Button>
          <Button onClick={handleNext} disabled={activeStep === steps.length - 1} variant="contained">
            Next
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <Button onClick={handleSaveChanges} variant="contained">
            Save Changes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

MultiStepCard.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default MultiStepCard;
