import { useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Typography, Grid, Paper, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { addProject, updateProject } from '../../../store/projectSlice';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const ProjectForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const initialProject = projects.find((proj: any) => proj.id === id);

  const validationSchema = Yup.object({
    customer: Yup.string().required('customer  is required'),
    refNumber: Yup.string().required('ref number is required'),
    projectName: Yup.string().required('project name is required'),
    projectNumber: Yup.string().required('project number is required'),
    areaLocation: Yup.string().required('area location is required'),
    address: Yup.string().required('address is required'),
    dueDate: Yup.date().required('due date is required'),
    contact: Yup.string().required('contact is required'),
    manager: Yup.string().required('manager is required'),
    staff: Yup.string().required('staff is required'),
    status: Yup.string().required('status is required'),
    email: Yup.string().email('Invalid email').required('email is required'),
  });

  const formik = useFormik({
    initialValues: {
      id: id || uuidv4(),
      customer: '',
      refNumber: '',
      projectName: '',
      projectNumber: '',
      areaLocation: '',
      address: '',
      dueDate: '',
      contact: '',
      manager: '',
      staff: '',
      status: '',
      email: '',
      comments: ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateProject(values));
      } else {
        dispatch(addProject(values));
      }
      navigate('/projects');
    },
  });

  useEffect(() => {
    if (id && initialProject) {
      formik.setValues(initialProject);
    }
  }, [id, initialProject]);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {id ? t('edit') : t('add')}
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('customer')}
                name="customer"
                value={formik.values.customer}
                onChange={formik.handleChange}
                error={formik.touched.customer && Boolean(formik.errors.customer)}
                helperText={formik.touched.customer && formik.errors.customer}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('ref_number')}
                name="refNumber"
                value={formik.values.refNumber}
                onChange={formik.handleChange}
                error={formik.touched.refNumber && Boolean(formik.errors.refNumber)}
                helperText={formik.touched.refNumber && formik.errors.refNumber}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('project_name')}
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                helperText={formik.touched.projectName && formik.errors.projectName}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('project_number')}
                name="projectNumber"
                value={formik.values.projectNumber}
                onChange={formik.handleChange}
                error={formik.touched.projectNumber && Boolean(formik.errors.projectNumber)}
                helperText={formik.touched.projectNumber && formik.errors.projectNumber}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('area_location')}
                name="areaLocation"
                value={formik.values.areaLocation}
                onChange={formik.handleChange}
                error={formik.touched.areaLocation && Boolean(formik.errors.areaLocation)}
                helperText={formik.touched.areaLocation && formik.errors.areaLocation}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('address')}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('due_date')}
                name="dueDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('contact')}
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('manager')}
                name="manager"
                value={formik.values.manager}
                onChange={formik.handleChange}
                error={formik.touched.manager && Boolean(formik.errors.manager)}
                helperText={formik.touched.manager && formik.errors.manager}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('staff')}
                name="staff"
                value={formik.values.staff}
                onChange={formik.handleChange}
                error={formik.touched.staff && Boolean(formik.errors.staff)}
                helperText={formik.touched.staff && formik.errors.staff}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label={t('status')}
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <MenuItem value="Processing">{t('processing')}</MenuItem>
                <MenuItem value="Completed">{t('completed')}</MenuItem>
                <MenuItem value="Rejected">{t('rejected')}</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label={t('email')}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>

          <Box mt={4} display="flex" justifyContent="flex-start" gap={2}>
            <Button type="submit" variant="contained" color="primary">
              {id ? t('update_project') : t('add_project')}
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate('/projects')}>
              {t('cancel')}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ProjectForm;
