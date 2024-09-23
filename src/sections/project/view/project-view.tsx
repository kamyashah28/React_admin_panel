import { useState } from 'react';
import { Box, Button, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, FormControl, InputLabel, Select, SelectChangeEvent, Checkbox, FormGroup, FormControlLabel, Divider, TextField } from '@mui/material';
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
  const { t } = useTranslation();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState('');
  const [dueDateFilter, setDueDateFilter] = useState<string>('');
  const [showColumns, setShowColumns] = useState({
    customer: true,
    ref_number: true,
    project_name: true,
    project_number: true,
    area_location: true,
    address: true,
    due_date: true,
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
    setDueDateFilter('');
  };

  const handleEdit = (projectId: string) => {
    navigate(`/project-form/${projectId}`);
  };

  const handleDelete = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  const filteredProjects = projects.filter((project) => {
    const isStatusMatch = !statusFilter || project.status === statusFilter;
    const isDateMatch = !dueDateFilter || project.dueDate === dueDateFilter;
    return isStatusMatch && isDateMatch;
  });

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
              <MenuItem value="Processing">{t('processing')}</MenuItem>
              <MenuItem value="Completed">{t('completed')}</MenuItem>
              <MenuItem value="Rejected">{t('rejected')}</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={t('due_date')}
            type="date"
            value={dueDateFilter}
            onChange={(e: any) => setDueDateFilter(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />

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
                  onChange={() => setShowColumns((prev: any) => ({
                    ...prev,
                    [col]: !prev[col as keyof typeof showColumns],
                  }))}
                />
              }
              label={t(col)}
            />
          ))}
        </FormGroup>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ffffff' }}>
              {showColumns.customer && <TableCell>{t('customer')}</TableCell>}
              {showColumns.ref_number && <TableCell>{t('ref_number')}</TableCell>}
              {showColumns.project_name && <TableCell>{t('project_name')}</TableCell>}
              {showColumns.project_number && <TableCell>{t('project_number')}</TableCell>}
              {showColumns.area_location && <TableCell>{t('area_location')}</TableCell>}
              {showColumns.address && <TableCell>{t('address')}</TableCell>}
              {showColumns.due_date && <TableCell>{t('due_date')}</TableCell>}
              {showColumns.contact && <TableCell>{t('contact')}</TableCell>}
              {showColumns.manager && <TableCell>{t('manager')}</TableCell>}
              {showColumns.staff && <TableCell>{t('staff')}</TableCell>}
              {showColumns.status && <TableCell>{t('status')}</TableCell>}
              {showColumns.actions && <TableCell>{t('actions')}</TableCell>}
              {showColumns.comments && <TableCell>{t('comments')}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#ffffff' } }}>
                {showColumns.customer && <TableCell>{project.customer}</TableCell>}
                {showColumns.ref_number && <TableCell>{project.refNumber}</TableCell>}
                {showColumns.project_name && <TableCell>{project.projectName}</TableCell>}
                {showColumns.project_number && <TableCell>{project.projectNumber}</TableCell>}
                {showColumns.area_location && <TableCell>{project.areaLocation}</TableCell>}
                {showColumns.address && <TableCell>{project.address}</TableCell>}
                {showColumns.due_date && <TableCell>{formatDate(project.dueDate)}</TableCell>}
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
