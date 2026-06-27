import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography, Button,
  TextField, MenuItem, Chip, IconButton, Tooltip,
} from '@mui/material';
import DownloadIcon      from '@mui/icons-material/Download';
import AssessmentIcon    from '@mui/icons-material/Assessment';
import RefreshIcon       from '@mui/icons-material/Refresh';

import { fetchReports } from '../../store/slices/reportSlice';
import PageHeader  from '../../components/common/PageHeader';
import DataTable   from '../../components/common/DataTable';
import SearchBar   from '../../components/common/SearchBar';
import Loader      from '../../components/common/Loader';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RTooltip, ResponsiveContainer, Cell,
} from 'recharts';

const REPORT_TYPES = ['all','Procurement','Risk','Compliance','Vendor','Audit'];
const COLORS = ['#0070E0','#2E7D32','#7B1FA2','#ED6C02','#0288D1'];

export default function ReportsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.report);

  const [search,     setSearch]     = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => { dispatch(fetchReports()); }, [dispatch]);

  const filtered = useMemo(() => items.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === 'all' || r.type === typeFilter;
    return matchSearch && matchType;
  }), [items, search, typeFilter]);

  const chartData = useMemo(() => {
    const types = ['Procurement','Risk','Compliance','Vendor','Audit'];
    return types.map((t) => ({
      type:  t,
      count: items.filter((r) => r.type === t).length,
    }));
  }, [items]);

  const columns = [
    { field: 'id',     headerName: 'Report ID', sortable: true },
    { field: 'title',  headerName: 'Title',     sortable: true },
    { field: 'type',   headerName: 'Type',      sortable: true,
      render: (val) => <Chip label={val} size="small" variant="outlined" color="primary" />,
    },
    { field: 'date',   headerName: 'Generated', sortable: true },
    { field: 'size',   headerName: 'Size',      sortable: false },
    { field: 'status', headerName: 'Status',    sortable: true,
      render: (val) => (
        <Chip label={val === 'ready' ? 'Ready' : 'Generating...'}
          color={val === 'ready' ? 'success' : 'warning'} size="small" />
      ),
    },
    { field: 'actions', headerName: 'Download', sortable: false,
      render: (_, row) => (
        <Tooltip title={row.status === 'ready' ? 'Download Report' : 'Not ready yet'}>
          <span>
            <IconButton size="small" color="primary" disabled={row.status !== 'ready'}
              onClick={() => alert(`Downloading ${row.title}...`)}>
              <DownloadIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      ),
    },
  ];

  if (loading) return <Loader message="Loading reports..." />;

  return (
    <Box>
      <PageHeader
        title="Reporting Center"
        subtitle="Generate, view and export platform reports"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Reports' }]}
        actions={
          <Button variant="contained" startIcon={<AssessmentIcon />}
            onClick={() => dispatch(fetchReports())}>
            Generate Report
          </Button>
        }
      />

      {/* Summary + Chart */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {[
              { label: 'Total Reports', value: items.length,                              color: '#0070E0' },
              { label: 'Ready',         value: items.filter((r) => r.status === 'ready').length, color: '#2E7D32' },
              { label: 'Generating',    value: items.filter((r) => r.status !== 'ready').length, color: '#ED6C02' },
            ].map((s) => (
              <Grid item xs={12} key={s.label}>
                <Card>
                  <CardContent sx={{ py: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}
                      sx={{ textTransform: 'uppercase' }}>{s.label}</Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ color: s.color, mt: 0.3 }}>
                      {s.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>Reports by Type</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="type" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <RTooltip />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search reports..." />
            <TextField select size="small" label="Type" value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)} sx={{ minWidth: 140 }}>
              {REPORT_TYPES.map((t) => (
                <MenuItem key={t} value={t}>{t === 'all' ? 'All Types' : t}</MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {filtered.length} of {items.length} reports
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <DataTable columns={columns} rows={filtered} defaultSort="date" emptyMessage="No reports found." />
    </Box>
  );
}