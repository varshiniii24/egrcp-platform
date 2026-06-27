import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Grid, Card, CardContent, Typography,
  TextField, MenuItem, IconButton, Tooltip, LinearProgress,
} from '@mui/material';
import AddIcon      from '@mui/icons-material/Add';
import CloseIcon    from '@mui/icons-material/Close';
import WarningIcon  from '@mui/icons-material/Warning';
import ErrorIcon    from '@mui/icons-material/Error';
import InfoIcon     from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { fetchRisks, addRisk, closeRisk } from '../../store/slices/riskSlice';
import PageHeader    from '../../components/common/PageHeader';
import DataTable     from '../../components/common/DataTable';
import SearchBar     from '../../components/common/SearchBar';
import StatusChip    from '../../components/common/StatusChip';
import Loader        from '../../components/common/Loader';
import ErrorState    from '../../components/common/ErrorState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import AddRiskModal  from './AddRiskModal';

const SEVERITY_CONFIG = {
  critical: { color: '#D32F2F', bg: '#FFEBEE', icon: <ErrorIcon fontSize="small" /> },
  high:     { color: '#ED6C02', bg: '#FFF3E0', icon: <WarningIcon fontSize="small" /> },
  medium:   { color: '#0288D1', bg: '#E3F2FD', icon: <InfoIcon fontSize="small" /> },
  low:      { color: '#2E7D32', bg: '#E8F5E9', icon: <CheckCircleIcon fontSize="small" /> },
};

const SEVERITIES  = ['all','critical','high','medium','low'];
const CATEGORIES  = ['all','Cybersecurity','Operational','Compliance','Financial','HR','Legal'];

export default function RiskPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.risk);

  const [search,          setSearch]          = useState('');
  const [severityFilter,  setSeverityFilter]  = useState('all');
  const [categoryFilter,  setCategoryFilter]  = useState('all');
  const [statusFilter,    setStatusFilter]    = useState('all');
  const [addOpen,         setAddOpen]         = useState(false);
  const [closeConfirm,    setCloseConfirm]    = useState(null);

  useEffect(() => { dispatch(fetchRisks()); }, [dispatch]);

  const filtered = useMemo(() => {
    return items.filter((r) => {
      const matchSearch   = r.title.toLowerCase().includes(search.toLowerCase()) ||
                            r.owner.toLowerCase().includes(search.toLowerCase());
      const matchSeverity = severityFilter === 'all' || r.severity === severityFilter;
      const matchCategory = categoryFilter === 'all' || r.category === categoryFilter;
      const matchStatus   = statusFilter   === 'all' || r.status   === statusFilter;
      return matchSearch && matchSeverity && matchCategory && matchStatus;
    });
  }, [items, search, severityFilter, categoryFilter, statusFilter]);

  const summary = useMemo(() => ({
    total:    items.length,
    critical: items.filter((r) => r.severity === 'critical').length,
    high:     items.filter((r) => r.severity === 'high').length,
    open:     items.filter((r) => r.status   === 'open').length,
    closed:   items.filter((r) => r.status   === 'closed').length,
  }), [items]);

  const handleAdd = useCallback((data) => {
    dispatch(addRisk({
      ...data,
      id:     `R-${Date.now()}`,
      status: 'open',
      date:   new Date().toISOString().split('T')[0],
    }));
    setAddOpen(false);
  }, [dispatch]);

  const handleClose = useCallback((id) => setCloseConfirm(id), []);

  const confirmClose = () => {
    dispatch(closeRisk(closeConfirm));
    setCloseConfirm(null);
  };

  const columns = [
    { field: 'id',        headerName: 'Risk ID',   sortable: true },
    { field: 'title',     headerName: 'Title',     sortable: true },
    { field: 'category',  headerName: 'Category',  sortable: true },
    { field: 'severity',  headerName: 'Severity',  sortable: true,
      render: (val) => {
        const cfg = SEVERITY_CONFIG[val] || {};
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5,
            backgroundColor: cfg.bg, color: cfg.color,
            px: 1, py: 0.3, borderRadius: 1, width: 'fit-content' }}>
            {cfg.icon}
            <Typography variant="caption" fontWeight={700} sx={{ textTransform: 'capitalize' }}>{val}</Typography>
          </Box>
        );
      },
    },
    { field: 'likelihood', headerName: 'Likelihood', sortable: true },
    { field: 'impact',     headerName: 'Impact',     sortable: true },
    { field: 'owner',      headerName: 'Owner',      sortable: true },
    { field: 'status',     headerName: 'Status',     sortable: true,
      render: (val) => <StatusChip status={val} />,
    },
    { field: 'actions',    headerName: 'Actions',    sortable: false,
      render: (_, row) => (
        <Tooltip title="Close Risk">
          <span>
            <IconButton size="small" color="error"
              disabled={row.status === 'closed'}
              onClick={() => handleClose(row.id)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      ),
    },
  ];

  if (loading) return <Loader message="Loading risk data..." />;
  if (error)   return <ErrorState message={error} onRetry={() => dispatch(fetchRisks())} />;

  return (
    <Box>
      <PageHeader
        title="Risk Center"
        subtitle="Identify, assess and mitigate organizational risks"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Risk Center' }]}
        actions={
          <Button variant="contained" color="error" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            Register Risk
          </Button>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Risks',    value: summary.total,    color: '#0070E0' },
          { label: 'Critical',       value: summary.critical, color: '#D32F2F' },
          { label: 'High Severity',  value: summary.high,     color: '#ED6C02' },
          { label: 'Open Risks',     value: summary.open,     color: '#7B1FA2' },
        ].map((s) => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
                  {s.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: s.color, mt: 0.5 }}>
                  {s.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Risk Level Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.entries(SEVERITY_CONFIG).map(([level, cfg]) => {
          const count = items.filter((r) => r.severity === level).length;
          const pct   = items.length ? Math.round((count / items.length) * 100) : 0;
          return (
            <Grid item xs={6} md={3} key={level}>
              <Card sx={{ border: `2px solid ${cfg.color}20` }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box sx={{ color: cfg.color }}>{cfg.icon}</Box>
                    <Typography variant="body2" fontWeight={700} sx={{ textTransform: 'capitalize', color: cfg.color }}>
                      {level}
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight={700}>{count} risks</Typography>
                  <LinearProgress variant="determinate" value={pct}
                    sx={{ mt: 1, height: 6, borderRadius: 3,
                      backgroundColor: cfg.bg,
                      '& .MuiLinearProgress-bar': { backgroundColor: cfg.color } }} />
                  <Typography variant="caption" color="text.secondary">{pct}% of total</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search risks..." />
            <TextField select size="small" label="Severity" value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)} sx={{ minWidth: 130 }}>
              {SEVERITIES.map((s) => (
                <MenuItem key={s} value={s}>{s === 'all' ? 'All Severities' : s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
              ))}
            </TextField>
            <TextField select size="small" label="Category" value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)} sx={{ minWidth: 140 }}>
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</MenuItem>
              ))}
            </TextField>
            <TextField select size="small" label="Status" value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 120 }}>
              {['all','open','closed'].map((s) => (
                <MenuItem key={s} value={s}>{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {filtered.length} of {items.length} risks
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <DataTable columns={columns} rows={filtered} defaultSort="severity" emptyMessage="No risks found." />

      <AddRiskModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} />
      <ConfirmDialog
        open={!!closeConfirm}
        title="Close Risk"
        message="Are you sure you want to close this risk? It will be marked as resolved."
        confirmLabel="Close Risk"
        severity="warning"
        onConfirm={confirmClose}
        onCancel={() => setCloseConfirm(null)}
      />
    </Box>
  );
}