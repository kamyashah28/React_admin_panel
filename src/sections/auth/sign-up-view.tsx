import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import { RootState, AppDispatch } from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormValues {
    email: string;
    password: string;
    username: string;
    acceptTerms: boolean;
}

export function SignUpView() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        acceptTerms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
            username: '',
            acceptTerms: false,
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values)).then((action) => {
                if (registerUser.fulfilled.match(action)) {
                    navigate('/sign-in');
                }
            });
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
                {t('create_an_account')}
            </Typography>
            <Typography variant="body2">{t('create_an_account_to_continue')}</Typography>

            <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
            />

            <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
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
                        name="acceptTerms"
                        checked={formik.values.acceptTerms}
                        onChange={formik.handleChange}
                    />
                }
                label={t('accept_terms')}
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
                {t('sign_up')}
            </LoadingButton>
            <Typography variant="body2" sx={{ mt: 3 }}>{t('already_have_account')} <Link to="/sign-in">{t('login')}</Link></Typography>
        </Box>
    );
}
