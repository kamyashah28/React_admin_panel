import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteEstimation } from '../../../store/estimationSlice';
import { formatDate } from '../../../utils/format-date';
import { useTranslation } from 'react-i18next';

export function EstimatesView() {
  const { t } = useTranslation();
  const estimates = useSelector((state: RootState) => state.estimations.estimations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (estimateId: string) => {
    navigate(`/estimation-form/${estimateId}`);
  };

  const handleDelete = (estimateId: string) => {
    dispatch(deleteEstimation(estimateId));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t('estimates')}
      </Typography>

      <Box display="flex" justifyContent="right" mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/estimation-form"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            textTransform: 'none',
          }}
        >
          {t('add_estimate')}
        </Button>
      </Box>

      <Divider />

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>{t('version')}</TableCell>
              <TableCell>{t('project')}</TableCell>
              <TableCell>{t('client')}</TableCell>
              <TableCell>{t('created_date')}</TableCell>
              <TableCell>{t('last_modified')}</TableCell>
              <TableCell>{t('status')}</TableCell>
              <TableCell>{t('actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimates
              .map((estimate) => (
                <TableRow key={estimate.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#ffffff' } }}>
                  <TableCell>{estimate.version}</TableCell>
                  <TableCell>{estimate.project}</TableCell>
                  <TableCell>{estimate.client}</TableCell>
                  <TableCell>{formatDate(estimate.createdDate)}</TableCell>
                  <TableCell>{formatDate(estimate.lastModified)}</TableCell>
                  <TableCell>{estimate.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(estimate.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(estimate.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
