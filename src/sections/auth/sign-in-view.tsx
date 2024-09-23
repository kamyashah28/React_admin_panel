import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { RootState, AppDispatch } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function SignInView() {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values: any) => {
      dispatch(loginUser(values)).then((action) => {
        if (loginUser.fulfilled.match(action)) {
          if (values.rememberMe) {
            localStorage.setItem('isAuthenticated', 'true');
          }
          navigate('/');
        }
      });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" gutterBottom>
        {t('login_to_account')}
      </Typography>
      <Typography variant="body2">{t('please_enter_email_password')}</Typography>

      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email address"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        margin="normal"
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'} 
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {error && <Typography color="error">{error}</Typography>}

      <FormControlLabel
        control={
          <Checkbox
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
        }
        label={t('remember_me')}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        loading={loading}
        sx={{ mt: 3 }}
      >
        {t('sign_in')}
      </LoadingButton>
      <Typography variant="body2" sx={{ mt: 3 }}>
        <Link to="/forgot-password">{t('forgot_password')}</Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 3 }}>{t('dont_have_an_account')} <Link to="/sign-up">{t('create_account')}</Link>
      </Typography>
    </Box>
  );
}
