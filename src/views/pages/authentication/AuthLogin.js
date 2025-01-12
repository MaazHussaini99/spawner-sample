import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { AuthContext } from '../../../hooks/AuthContext';
//import Cookies from 'js-cookie';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AuthLogin = ({ ...others }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [initialLogin, setInitialLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetPasswordRequired, setIsResetPasswordRequired] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fields = (field) => {
    const encrypted = CryptoJS.AES.encrypt(field, process.env.REACT_APP_ENCRYPTION_KEY).toString();
    return encrypted;
  };

  const handleCheckLogin = async (empId, setStatus, setErrors, setSubmitting) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/check-login`, { empId: fields(empId) })
        .then((response) => {
          if (response.data.response === true) {
            setIsResetPasswordRequired(true);
            setStatus({ success: true });
            setSubmitting(false);
            setInitialLogin(false);
          } else if (response.data.response === false) {
            setInitialLogin(false);
            setStatus({ success: true });
            setSubmitting(false);
          } else if (response.data.response.code === 'USER_NOT_FOUND') {
            setErrors({ submit: response.data.response.message });
            setStatus({ success: false });
            setSubmitting(false);
          }
        })
        .catch((error) => {
          setErrors({ submit: error.response.data.response.message });
          setStatus({ success: false });
          setSubmitting(false);
        });
    } catch (err) {
      handleErrors(err, setErrors, setStatus, setSubmitting);
    }
  };

  const handleCheckInitialPassword = async (values, setStatus, setErrors, setSubmitting) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/check-password`, {
          empId: fields(values.empId),
          initialPassword: fields(values.initialPassword)
        })
        .then((response) => {
          if (response.data.response.code === 'USER_INITIAL_SUCCESS') {
            navigate('/create-password', { state: { empId: values.empId } });
          } else {
            setErrors({ submit: response.data.response.message });
            setStatus({ success: false });
          }
          setSubmitting(false);
        })
        .catch((error) => {
          setErrors({ submit: error.response.data.response.message });
          setStatus({ success: false });
          setSubmitting(false);
        });
    } catch (err) {
      handleErrors(err, setErrors, setStatus, setSubmitting);
    }
  };

  const handleLogin = async (values, setStatus, setErrors, setSubmitting) => {
    try {
      const result = await login(fields(values.empId), fields(values.password));

      if (result.success) {
        setStatus({ success: true });
        navigate('/dashboard');
      } else {
        setStatus({ success: false });
        setErrors({ submit: result.message });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ submit: 'An error occurred during login.' });
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  };

  const handleErrors = (err, setErrors, setStatus, setSubmitting) => {
    let errorMessage = 'An error occurred. Please try again.';
    if (err.response && err.response.data && err.response.data.response) {
      errorMessage = err.response.data.response.message;
    }
    setErrors({ submit: errorMessage });
    setStatus({ success: false });
    setSubmitting(false);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={{
          empId: '',
          initialPassword: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          empId: Yup.string().required('Employee ID is required'),
          initialPassword: Yup.string().when('isResetPasswordRequired', {
            is: true,
            then: Yup.string().required('Initial Password is required')
          }),
          password: Yup.string().when('initialLogin', {
            is: false,
            then: Yup.string().required('Password is required')
          })
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          if (initialLogin) {
            handleCheckLogin(values.empId, setStatus, setErrors, setSubmitting);
          } else if (isResetPasswordRequired) {
            handleCheckInitialPassword(values, setStatus, setErrors, setSubmitting);
          } else {
            handleLogin(values, setStatus, setErrors, setSubmitting);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.empId && errors.empId)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-empId">Employee ID</InputLabel>
              <OutlinedInput
                id="outlined-adornment-empId"
                type="text"
                value={values.empId}
                name="empId"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Employee ID"
                inputProps={{}}
              />
              {touched.empId && errors.empId && (
                <FormHelperText error id="standard-weight-helper-text-empId">
                  {errors.empId}
                </FormHelperText>
              )}
            </FormControl>

            {isResetPasswordRequired && (
              <FormControl
                fullWidth
                error={Boolean(touched.initialPassword && errors.initialPassword)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel htmlFor="outlined-adornment-initialPassword">Initial Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-initialPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={values.initialPassword}
                  name="initialPassword"
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
                  label="Initial Password"
                  inputProps={{}}
                />
                {touched.initialPassword && errors.initialPassword && (
                  <FormHelperText error id="standard-weight-helper-text-initialPassword">
                    {errors.initialPassword}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {!initialLogin && !isResetPasswordRequired && (
              <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
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
                  inputProps={{}}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  {initialLogin ? 'Next' : 'Sign in'}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
