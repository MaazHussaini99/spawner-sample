import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  LinearProgress,
  useTheme
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

const fields = (field) => {
  const encrypted = CryptoJS.AES.encrypt(field, process.env.REACT_APP_ENCRYPTION_KEY).toString();
  return encrypted;
};
// Helper functions for password validation
const hasNumber = (str) => new RegExp(/[0-9]/).test(str);
const hasLower = (str) => new RegExp(/[a-z]/).test(str);
const hasUpper = (str) => new RegExp(/[A-Z]/).test(str);
const hasSpecial = (str) => new RegExp(/[!#@$%^&*)(+=._-]/).test(str);

// Set color based on password strength
const strengthColor = (count) => {
  if (count < 2) return { label: 'Poor', color: '#FF0000' };
  if (count < 3) return { label: 'Weak', color: '#FFA500' };
  if (count < 4) return { label: 'Normal', color: '#FFD700' };
  if (count < 5) return { label: 'Good', color: '#00FF00' };
  if (count < 6) return { label: 'Strong', color: '#008000' };
  return { label: 'Poor', color: '#FF0000' };
};

// Password strength indicator
const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasLower(number) && hasUpper(number)) strengths += 1;
  return strengths;
};

const AuthPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const empId = location.state.empId;
  if (!empId) {
    navigate('/');
  }
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, color: '', label: '' });
  const [passwordHelper, setPasswordHelper] = useState([]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const updatePasswordStrength = (password) => {
    const score = strengthIndicator(password);
    const { label, color } = strengthColor(score);
    setPasswordStrength({ score, color, label });

    const helpers = [];
    if (!hasLower(password)) helpers.push('Small letters missing (e.g. a, b, c, etc)');
    if (!hasUpper(password)) helpers.push('Capital letters missing (e.g. A, B, C, etc)');
    if (!hasNumber(password)) helpers.push('Number missing (e.g. 1, 4, 2, 5, etc)');
    if (!hasSpecial(password)) helpers.push('Special character missing (e.g. @, #, $, %, etc)');
    if (password.length < 8) helpers.push('At least 8 characters');

    setPasswordHelper(helpers);
  };

  return (
    <>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .required('New Password is required')
            .test('password-strength', 'Password is too weak', (value) => {
              updatePasswordStrength(value);
              return strengthIndicator(value) >= 3;
            }),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // Encrypt the new password before sending it to the server
            const encryptedPassword = fields(values.newPassword);
            const encryptedEmpId = fields(empId);

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/create-password`, {
              empId: encryptedEmpId,
              newPassword: encryptedPassword
            });

            if (response.status === 200) {
              setStatus({ success: true });
              setSubmitting(false);
              navigate('/');
            }
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  updatePasswordStrength(e.target.value);
                }}
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
                label="New Password"
              />
              {touched.newPassword && errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
              <LinearProgress
                variant="determinate"
                value={(passwordStrength.score / 5) * 100}
                style={{
                  marginTop: 10,
                  height: 10,
                  backgroundColor: '#ddd',
                  borderRadius: 5
                }}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: passwordStrength.color
                  }
                }}
              />
              <Typography variant="caption" display="block" style={{ color: passwordStrength.color }}>
                {`Strength: ${passwordStrength.label}`}
              </Typography>
              {passwordHelper.map((helper, index) => (
                <Typography key={index} variant="caption" display="block" style={{ color: 'black', fontWeight: 'bold' }}>
                  {helper}
                </Typography>
              ))}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
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
                label="Confirm Password"
              />
              {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Create Password
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthPassword;
