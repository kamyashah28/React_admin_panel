import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEstimation, updateEstimation } from '../../../store/estimationSlice';
import { v4 as uuidv4 } from 'uuid';
import {
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EstimateForm = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const estimations = useSelector((state: any) => state.estimations.estimations);
    const initialData = estimations.find((estimate: any) => estimate.id === id);

    const [estimate, setEstimate] = useState(initialData || {
        id: uuidv4(),
        project: `Project ${estimations.length + 1}`,
        client: `Client ${estimations.length + 1}`,
        version: `v1`,
        createdDate: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: 'Created',
        sections: [
            {
                id: uuidv4(),
                title: 'Sample Section',
                items: [{ id: uuidv4(), title: '', description: '', unit: '', quantity: 0, price: 0, margin: 0, total: 0 }],
            },
        ],
    });

    useEffect(() => {
        if (initialData) {
            setEstimate(initialData);
        }
    }, [initialData]);

    const handleAddSection = () => {
        const newSection = {
            id: uuidv4(),
            title: '',
            items: [{ id: uuidv4(), title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0, total: 0 }],
        };

        const newVersion = `v${estimate.sections.length + 2}`;
        const newProject = `Project ${estimations.length + 1}`;
        setEstimate((prev: any) => ({
            ...prev,
            project: newProject,
            version: newVersion,
            sections: [...prev.sections, newSection],
        }));
    };

    const handleAddItem = (sectionId: any) => {
        const updatedSections = estimate.sections.map((section: any) =>
            section.id === sectionId
                ? {
                    ...section,
                    items: [...section.items, { id: uuidv4(), title: '', description: '', unit: '', quantity: 1, price: 0, margin: 0, total: 0 }],
                }
                : section
        );
        setEstimate({ ...estimate, sections: updatedSections });
    };

    const handleInputChange = (sectionId: any, itemId: any, field: string, value: string | number) => {
        const updatedSections = estimate.sections.map((section: any) =>
            section.id === sectionId
                ? {
                    ...section,
                    items: section.items.map((item: any) => (item.id === itemId ? { ...item, [field]: value } : item)),
                }
                : section
        );
        setEstimate({ ...estimate, sections: updatedSections });
    };

    const handleDeleteItem = (sectionId: any, itemId: any) => {
        const updatedSections = estimate.sections.map((section: { id: any; items: any[]; }) =>
            section.id === sectionId
                ? {
                    ...section,
                    items: section.items.filter((item: { id: any; }) => item.id !== itemId),
                }
                : section
        );
        setEstimate({ ...estimate, sections: updatedSections });
    };

    const handleSubmit = () => {
        if (initialData) {
            dispatch(updateEstimation(estimate));
        } else {
            dispatch(addEstimation(estimate));
        }
        navigate('/estimations');
    };

    const calculateTotals = () => {
        let subtotal = 0;
        let totalMargin = 0;

        estimate.sections.forEach((section: any) => {
            section.items.forEach((item: any) => {
                const itemTotal = item.quantity * item.price;
                const itemMargin = (itemTotal * item.margin) / 100;
                subtotal += itemTotal;
                totalMargin += itemMargin;
            });
        });
        return { subtotal, totalMargin };
    };
    const { subtotal, totalMargin } = calculateTotals();

    return (
        <Box sx={{ maxWidth: '1000px', p: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>{initialData ? `${t('edit_estimate')}` : `${t('add_new_estimate')}`}</Typography>
            {estimate.sections.map((section: any, sectionIndex: number) => (
                <Box key={section.id}>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}> <IconButton onClick={() => handleAddSection()}>
                        <AddIcon />
                    </IconButton> {t('section')} {sectionIndex + 1}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('item')}</TableCell>
                                    <TableCell>{t('description')}</TableCell>
                                    <TableCell>{t('unit')}</TableCell>
                                    <TableCell>{t('quantity')}</TableCell>
                                    <TableCell>{t('price')}</TableCell>
                                    <TableCell>{t('margin')}</TableCell>
                                    <TableCell>{t('total')}</TableCell>
                                    <TableCell>{t('action')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {section.items.map((item: any) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                value={item.title}
                                                onChange={(e) => handleInputChange(section.id, item.id, 'title', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                value={item.description}
                                                onChange={(e) => handleInputChange(section.id, item.id, 'description', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                value={item.unit}
                                                onChange={(e) => handleInputChange(section.id, item.id, 'unit', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={item.quantity}
                                                onChange={(e) => handleInputChange(section.id, item.id, 'quantity', parseInt(e.target.value))}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={item.price}
                                                onChange={(e) => handleInputChange(section.id, item.id, 'price', parseFloat(e.target.value))}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                variant="outlined"
                                                size="small"
                                                value={item.margin}
                                                onChange={(e) => handleInputChange(section.id, item.id, 'margin', parseFloat(e.target.value))}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {((item.price * item.quantity) + ((item.price * item.quantity) * (item.margin / 100))).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDeleteItem(section.id, item.id)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleAddItem(section.id)}>
                                                <AddIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                        <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: 'auto', mr: 2 }}>
    <Divider sx={{ width: '250px', mb: 1 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '250px', mb: 1 }}>
        <Typography variant="body1">{t('sub_total')}:</Typography>
        <Typography variant="body1">{subtotal.toFixed(2)}</Typography>
    </Box>
    <Divider sx={{ width: '250px', my: 1 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '250px', mb: 1 }}>
        <Typography variant="body1">{t('total_margin')}:</Typography>
        <Typography variant="body1">{totalMargin.toFixed(2)}</Typography>
    </Box>
    <Divider sx={{ width: '250px', my: 1 }} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
        <Typography variant="h6">{t('total')}:</Typography>
        <Typography variant="h6">{(subtotal + totalMargin).toFixed(2)}</Typography>
    </Box>
    <Divider sx={{ width: '250px', mt: 1 }} />
</Box>


                    </TableContainer>
                </Box>
            ))}
            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    {id ? `${t('update_estimate')}` : `${t('add_estimate')}`}
                </Button>
                <Button variant="outlined" color="primary" onClick={() => navigate('/estimations')}>
                    {t('cancel')}
                </Button>
            </Box>
        </Box>
    );
};

export default EstimateForm;
