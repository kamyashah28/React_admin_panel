import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/authSlice';
import { RootState, AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FormValues {
    email: string;
}

export function ForgotPasswordView() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error, forgotPasswordSuccess } = useSelector((state: RootState) => state.auth);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(forgotPassword(values));
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
                {t('forgot_password')}
            </Typography>
            <Typography variant="body2">{t('enter_your_email_to_receive_password')}</Typography>

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

            {error && <Typography color="error">{error}</Typography>}
            {forgotPasswordSuccess && <Typography color="success">{t('reset_link_sent_to_email')}</Typography>}

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                loading={loading}
                sx={{ mt: 3 }}
            >
                {t('send_reset_link')}
            </LoadingButton>

            <Button
                variant="text"
                onClick={() => navigate('/sign-in')}
                sx={{ mt: 2 }}
            >
                {t('go_back')}
            </Button>
        </Box>
    );
}
