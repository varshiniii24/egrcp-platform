import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Grid, Card, CardContent, Typography,
  TextField, MenuItem, Chip, IconButton, Tooltip,
} from '@mui/material';
import AddIcon       from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { fetchAudits, addAudit } from '../../store/slices/auditSlice';
import PageHeader  from '../../components/common/PageHeader';
import DataTable   from '../../components/common/DataTable';
import SearchBar   from '../../components/common/SearchBar';
import StatusChip  from '../../components/common/StatusChip';
import Loader      from '../../components/common/Loader';
import ErrorState  from '../../components/common/ErrorState';
import Modal       from '../../components/common/Modal';

const schema = yup.object({
  title:     yup.string().required('Title is required').min(5, 'Min 5 chars'),
  type:      yup.string().required('Type is required'),
  auditor:   yup.string().required('Auditor name is required'),
  startDate: yup.string().required('Start date is required'),
  endDate:   yup.string().required('End date is required'),
});

const AUDIT_TYPES = ['Financial','Security','Operational','Compliance','HR'];

export default function AuditPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.audit);

  const [search,      setSearch]      = useState('');
  const [typeFilter,  setTypeFilter]  = useState('all');
  const [statusFilter,setStatusFilter]= useState('all');
  const [addOpen,     setAddOpen]     = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', type: '', auditor: '', startDate: '', endDate: '' },
  });

  useEffect(() => { dispatch(fetchAudits()); }, [dispatch]);

  const filtered = useMemo(() => items.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        a.auditor.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter   === 'all' || a.type   === typeFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  }), [items, search, typeFilter, statusFilter]);

  const summary = useMemo(() => ({
    total:   items.length,
    open:    items.filter((a) => a.status === 'open').length,
    closed:  items.filter((a) => a.status === 'closed').length,
    pending: items.filter((a) => a.status === 'pending').length,
  }), [items]);

  const handleAdd = (data) => {
    dispatch(addAudit({ ...data, id: `A-${Date.now()}`, status: 'pending', findings: 0 }));
    setAddOpen(false);
    reset();
  };

  const columns = [
    { field: 'id',        headerName: 'Audit ID',  sortable: true },
    { field: 'title',     headerName: 'Title',     sortable: true },
    { field: 'type',      headerName: 'Type',      sortable: true,
      render: (val) => <Chip label={val} size="small" variant="outlined" color="primary" />,
    },
    { field: 'auditor',   headerName: 'Auditor',   sortable: true },
    { field: 'startDate', headerName: 'Start Date',sortable: true },
    { field: 'endDate',   headerName: 'End Date',  sortable: true },
    { field: 'findings',  headerName: 'Findings',  sortable: true,
      render: (val) => (
        <Chip label={`${val} findings`} size="small"
          color={val > 5 ? 'error' : val > 2 ? 'warning' : 'success'} />
      ),
    },
    { field: 'status',    headerName: 'Status',    sortable: true,
      render: (val) => <StatusChip status={val} />,
    },
  ];

  if (loading) return <Loader message="Loading audit data..." />;
  if (error)   return <ErrorState message={error} onRetry={() => dispatch(fetchAudits())} />;

  return (
    <Box>
      <PageHeader
        title="Audit Center"
        subtitle="Plan, execute and manage audit activities"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Audit Center' }]}
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            New Audit
          </Button>
        }
      />

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Audits',  value: summary.total,   color: '#0070E0' },
          { label: 'Open',          value: summary.open,    color: '#ED6C02' },
          { label: 'Completed',     value: summary.closed,  color: '#2E7D32' },
          { label: 'Pending',       value: summary.pending, color: '#7B1FA2' },
        ].map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}
                  sx={{ textTransform: 'uppercase' }}>{s.label}</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: s.color, mt: 0.5 }}>
                  {s.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search audits..." />
            <TextField select size="small" label="Type" value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)} sx={{ minWidth: 140 }}>
              {['all', ...AUDIT_TYPES].map((t) => (
                <MenuItem key={t} value={t}>{t === 'all' ? 'All Types' : t}</MenuItem>
              ))}
            </TextField>
            <TextField select size="small" label="Status" value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 130 }}>
              {['all','open','closed','pending'].map((s) => (
                <MenuItem key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {filtered.length} of {items.length} audits
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <DataTable columns={columns} rows={filtered} defaultSort="startDate" emptyMessage="No audits found." />

      {/* Add Audit Modal */}
      <Modal open={addOpen} onClose={() => { setAddOpen(false); reset(); }} title="Schedule New Audit"
        actions={
          <>
            <Button onClick={() => { setAddOpen(false); reset(); }} variant="outlined">Cancel</Button>
            <Button onClick={handleSubmit(handleAdd)} variant="contained">Schedule</Button>
          </>
        }
      >
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid item xs={12}>
            <Controller name="title" control={control} render={({ field }) => (
              <TextField {...field} fullWidth label="Audit Title" error={!!errors.title} helperText={errors.title?.message} />
            )} />
          </Grid>
          <Grid item xs={6}>
            <Controller name="type" control={control} render={({ field }) => (
              <TextField {...field} fullWidth select label="Audit Type" error={!!errors.type} helperText={errors.type?.message}>
                {AUDIT_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            )} />
          </Grid>
          <Grid item xs={6}>
            <Controller name="auditor" control={control} render={({ field }) => (
              <TextField {...field} fullWidth label="Lead Auditor" error={!!errors.auditor} helperText={errors.auditor?.message} />
            )} />
          </Grid>
          <Grid item xs={6}>
            <Controller name="startDate" control={control} render={({ field }) => (
              <TextField {...field} fullWidth label="Start Date" type="date"
                InputLabelProps={{ shrink: true }} error={!!errors.startDate} helperText={errors.startDate?.message} />
            )} />
          </Grid>
          <Grid item xs={6}>
            <Controller name="endDate" control={control} render={({ field }) => (
              <TextField {...field} fullWidth label="End Date" type="date"
                InputLabelProps={{ shrink: true }} error={!!errors.endDate} helperText={errors.endDate?.message} />
            )} />
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}