import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Autocomplete from '@mui/material/Autocomplete';
import MainCard from 'ui-component/cards/reuseable/MainCard';
import axiosInstance from '../../utils/axiosInstance';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getSessionInfo } from '../../utils/sessionInfo';

const sessionInfo = getSessionInfo();

// Define your API calls to get departments, branches, and designations with Bearer token
const fetchDepartments = async () => {
  try {
    const response = await axiosInstance.get('/api/dash/departments');
    return response.data.departments;
  } catch (error) {
    return [];
  }
};

const fetchBranches = async () => {
  try {
    const response = await axiosInstance.get('/api/dash/branches');
    return response.data.branches;
  } catch (error) {
    return [];
  }
};

const fetchDesignations = async () => {
  try {
    const response = await axiosInstance.get('/api/dash/designations');
    return response.data.designations;
  } catch (error) {
    return [];
  }
};

const RegistrationForm = () => {
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black'); // default color

  useEffect(() => {
    const loadData = async () => {
      const departmentsData = await fetchDepartments();
      setDepartments(departmentsData);
      const branchesData = await fetchBranches();
      setBranches(branchesData);
      const designationsData = await fetchDesignations();
      setDesignations(designationsData);
    };

    loadData();
  }, []);

  const initialValues = {
    empId: '',
    firstName: '',
    lastName: '',
    department: '',
    branch: '',
    designation: '',
    password: '',
    insertedByUserId: sessionInfo.empId,
    lastUpdatedByUserId: sessionInfo.empId
  };

  const validationSchema = Yup.object().shape({
    empId: Yup.string().required('Employee ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    department: Yup.string().required('Department is required'),
    branch: Yup.string().required('Branch is required'),
    designation: Yup.string().required('Designation is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    const payload = {
      ...values,
      insertedByUserId: sessionInfo.empId,
      lastUpdatedByUserId: sessionInfo.empId
    };

    axiosInstance
      .post('/api/auth/sign-up', payload)
      .then((response) => {
        if (response.data.response.code === 'USER_SIGNUP_SUCCESS') {
          setMessageColor('green');
          setResponseMessage(response.data.response.message);
          resetForm();
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setErrors({ submit: error.response.data.response.message });
        setSubmitting(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="md" style={{ position: 'relative', top: '50px' }}>
      <MainCard title="Registration Form" content={true} boxShadow={true}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={departments.find((dept) => dept.DepartmentName === values.department) || null}
                    onChange={(event, newValue) => setFieldValue('department', newValue ? newValue.DepartmentName : '')}
                    options={departments}
                    getOptionLabel={(option) => option.DepartmentName || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
                        error={touched.department && Boolean(errors.department)}
                        helperText={touched.department && errors.department}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={branches.find((branch) => branch.BranchName === values.branch) || null}
                    onChange={(event, newValue) => setFieldValue('branch', newValue ? newValue.BranchName : '')}
                    options={branches}
                    getOptionLabel={(option) => option.BranchName || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Branch"
                        error={touched.branch && Boolean(errors.branch)}
                        helperText={touched.branch && errors.branch}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    value={designations.find((desig) => desig.DesignationName === values.designation) || null}
                    onChange={(event, newValue) => setFieldValue('designation', newValue ? newValue.DesignationName : '')}
                    options={designations}
                    getOptionLabel={(option) => option.DesignationName || ''}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Designation"
                        error={touched.designation && Boolean(errors.designation)}
                        helperText={touched.designation && errors.designation}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    name="empId"
                    value={values.empId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.empId && Boolean(errors.empId)}
                    helperText={touched.empId && errors.empId}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                  </FormControl>
                </Grid>
                {responseMessage && (
                  <Grid item xs={12}>
                    <div style={{ color: messageColor }}>{responseMessage}</div>
                  </Grid>
                )}
                {errors.submit && (
                  <Grid item xs={12}>
                    <div style={{ color: 'red' }}>{errors.submit}</div>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button type="submit" disabled={isSubmitting} size="large" fullWidth variant="contained">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
    </Container>
  );
};

export default RegistrationForm;
