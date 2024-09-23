import { useState } from 'react';
import { Box, Button, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, FormControl, InputLabel, Select, SelectChangeEvent, Checkbox, FormGroup, FormControlLabel, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProject } from '../../../store/projectSlice';
import { formatDate } from '../../../utils/format-date';
import { useTranslation } from 'react-i18next';

export function ProjectView() {
  const { t } = useTranslation()
  const projects = useSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState('');
  const [showColumns, setShowColumns] = useState({
    customer: true,
    refNumber: true,
    projectName: true,
    projectNumber: true,
    areaLocation: true,
    address: true,
    dueDate: true,
    contact: true,
    manager: true,
    staff: true,
    status: true,
    actions: true,
    comments: true
  });

  const handleFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleResetFilters = () => {
    setStatusFilter('');
  };

  const handleEdit = (projectId: string) => {
    navigate(`/project-form/${projectId}`);
  };

  const handleDelete = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
       {t('projects')}
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" style={{ width: 150 }}>
            <InputLabel>{t('status')}</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <MenuItem value="">{t('none')}</MenuItem>
              <MenuItem value="Created">{t('created')}</MenuItem>
              <MenuItem value="In Progress">{t('in_progress')}</MenuItem>
              <MenuItem value="Completed">{t('completed')}</MenuItem>
            </Select>
          </FormControl>

          <IconButton onClick={handleResetFilters}>
            <ClearIcon htmlColor='red' />
            <Typography variant='body2' color='red'>{t('reset_filter')}</Typography>
          </IconButton>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/project-form"
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            textTransform: 'none',
          }}
        >
          {t('add_project')}
        </Button>
      </Box>

      <Divider />

      <Box display="flex" mb={2} gap={3} alignItems="center" mt={2}>
        <Button
          variant="text"
          startIcon={<FilterListIcon />}
          sx={{ textTransform: 'none', color: 'gray' }}
        >
          {t('hide_columns')}
        </Button>
        <FormGroup row>
          {Object.keys(showColumns).map((col) => (
            <FormControlLabel
              key={col}
              control={
                <Checkbox
                  checked={showColumns[col as keyof typeof showColumns]}
                  onChange={() => setShowColumns((prev) => ({
                    ...prev,
                    [col]: !prev[col as keyof typeof showColumns],
                  }))}
                />
              }
              label={col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
            />
          ))}
        </FormGroup>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ffffff' }}>
              {showColumns.customer && <TableCell>{t('customer')}</TableCell>}
              {showColumns.refNumber && <TableCell>{t('ref_number')}</TableCell>}
              {showColumns.projectName && <TableCell>{t('project_name')}</TableCell>}
              {showColumns.projectNumber && <TableCell>{t('project_number')}</TableCell>}
              {showColumns.areaLocation && <TableCell>{t('area_location')}</TableCell>}
              {showColumns.address && <TableCell>{t('address')}</TableCell>}
              {showColumns.dueDate && <TableCell>{t('due_date')}</TableCell>}
              {showColumns.contact && <TableCell>{t('contact')}</TableCell>}
              {showColumns.manager && <TableCell>{t('manager')}</TableCell>}
              {showColumns.staff && <TableCell>{t('staff')}</TableCell>}
              {showColumns.status && <TableCell>{t('status')}</TableCell>}
              {showColumns.actions && <TableCell>{('actions')}</TableCell>}
              {showColumns.comments && <TableCell>{('comments')}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects
              .filter((project) => !statusFilter || project.status === statusFilter)
              .map((project) => (
                <TableRow key={project.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#ffffff' } }}>
                  {showColumns.customer && <TableCell>{project.customer}</TableCell>}
                  {showColumns.refNumber && <TableCell>{project.refNumber}</TableCell>}
                  {showColumns.projectName && <TableCell>{project.projectName}</TableCell>}
                  {showColumns.projectNumber && <TableCell>{project.projectNumber}</TableCell>}
                  {showColumns.areaLocation && <TableCell>{project.areaLocation}</TableCell>}
                  {showColumns.address && <TableCell>{project.address}</TableCell>}
                  {showColumns.dueDate && <TableCell>{formatDate(project.dueDate)}</TableCell>}
                  {showColumns.contact && <TableCell>{project.contact}</TableCell>}
                  {showColumns.manager && <TableCell>{project.manager}</TableCell>}
                  {showColumns.staff && <TableCell>{project.staff}</TableCell>}
                  {showColumns.status && <TableCell>{project.status}</TableCell>}
                  {showColumns.actions && (
                    <TableCell>
                      <IconButton onClick={() => handleEdit(project.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(project.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {showColumns.comments && <TableCell>{project.comments}</TableCell>}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
