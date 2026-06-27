import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography,
  LinearProgress, TextField, MenuItem, Chip,
} from '@mui/material';

import { fetchCompliances } from '../../store/slices/complianceSlice';
import PageHeader  from '../../components/common/PageHeader';
import DataTable   from '../../components/common/DataTable';
import SearchBar   from '../../components/common/SearchBar';
import StatusChip  from '../../components/common/StatusChip';
import Loader      from '../../components/common/Loader';
import ErrorState  from '../../components/common/ErrorState';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from 'recharts';

const STATUS_OPTIONS   = ['all','compliant','inreview','pending'];
const PRIORITY_OPTIONS = ['all','high','medium','low'];

export default function CompliancePage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.compliance);

  const [search,         setSearch]         = useState('');
  const [statusFilter,   setStatusFilter]   = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => { dispatch(fetchCompliances()); }, [dispatch]);

  const filtered = useMemo(() => {
    return items.filter((c) => {
      const matchSearch   = c.title.toLowerCase().includes(search.toLowerCase()) ||
                            c.framework.toLowerCase().includes(search.toLowerCase());
      const matchStatus   = statusFilter   === 'all' || c.status   === statusFilter;
      const matchPriority = priorityFilter === 'all' || c.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [items, search, statusFilter, priorityFilter]);

  const summary = useMemo(() => ({
    total:     items.length,
    compliant: items.filter((c) => c.status === 'compliant').length,
    inreview:  items.filter((c) => c.status === 'inreview').length,
    avgScore:  items.length
      ? Math.round(items.reduce((s, c) => s + c.progress, 0) / items.length)
      : 0,
  }), [items]);

  const radarData = useMemo(() =>
    items.map((c) => ({ framework: c.framework, score: c.progress })),
  [items]);

  const columns = [
    { field: 'id',        headerName: 'ID',          sortable: true },
    { field: 'title',     headerName: 'Title',       sortable: true },
    { field: 'framework', headerName: 'Framework',   sortable: true,
      render: (val) => <Chip label={val} size="small" variant="outlined" color="primary" />,
    },
    { field: 'owner',     headerName: 'Owner',       sortable: true },
    { field: 'priority',  headerName: 'Priority',    sortable: true,
      render: (val) => <StatusChip status={val} />,
    },
    { field: 'progress',  headerName: 'Progress',    sortable: true,
      render: (val) => (
        <Box sx={{ minWidth: 120 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
            <Typography variant="caption" fontWeight={700}>{val}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={val}
            sx={{ height: 6, borderRadius: 3,
              '& .MuiLinearProgress-bar': {
                backgroundColor: val >= 80 ? '#2E7D32' : val >= 60 ? '#ED6C02' : '#D32F2F',
              },
            }}
          />
        </Box>
      ),
    },
    { field: 'dueDate',   headerName: 'Due Date',    sortable: true },
    { field: 'status',    headerName: 'Status',      sortable: true,
      render: (val) => <StatusChip status={val} />,
    },
  ];

  if (loading) return <Loader message="Loading compliance data..." />;
  if (error)   return <ErrorState message={error} onRetry={() => dispatch(fetchCompliances())} />;

  return (
    <Box>
      <PageHeader
        title="Compliance Center"
        subtitle="Track regulatory frameworks and policy compliance"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Compliance Center' }]}
      />

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Frameworks', value: summary.total,     color: '#0070E0' },
          { label: 'Compliant',        value: summary.compliant, color: '#2E7D32' },
          { label: 'Under Review',     value: summary.inreview,  color: '#ED6C02' },
          { label: 'Avg Score',        value: `${summary.avgScore}%`, color: '#7B1FA2' },
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

      {/* Radar Chart + Framework Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>Compliance Radar</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="framework" tick={{ fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke="#0070E0" fill="#0070E0" fillOpacity={0.2} />
                  <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Grid container spacing={1.5}>
            {items.map((c) => (
              <Grid item xs={12} sm={6} key={c.id}>
                <Card sx={{ border: `1px solid ${c.progress >= 80 ? '#2E7D3230' : c.progress >= 60 ? '#ED6C0230' : '#D32F2F30'}` }}>
                  <CardContent sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Chip label={c.framework} size="small" color="primary" variant="outlined" />
                      <StatusChip status={c.status} />
                    </Box>
                    <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5, mb: 0.8 }} noWrap>{c.title}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                      <Typography variant="caption" color="text.secondary">Progress</Typography>
                      <Typography variant="caption" fontWeight={700}>{c.progress}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={c.progress}
                      sx={{ height: 6, borderRadius: 3,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: c.progress >= 80 ? '#2E7D32' : c.progress >= 60 ? '#ED6C02' : '#D32F2F',
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">Due: {c.dueDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by title or framework..." />
            <TextField select size="small" label="Status" value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 140 }}>
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
              ))}
            </TextField>
            <TextField select size="small" label="Priority" value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)} sx={{ minWidth: 130 }}>
              {PRIORITY_OPTIONS.map((p) => (
                <MenuItem key={p} value={p}>{p === 'all' ? 'All Priorities' : p.charAt(0).toUpperCase() + p.slice(1)}</MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {filtered.length} of {items.length} frameworks
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <DataTable columns={columns} rows={filtered} defaultSort="progress" emptyMessage="No compliance records found." />
    </Box>
  );
}