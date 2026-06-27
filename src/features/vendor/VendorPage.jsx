import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Grid, Card, CardContent, Typography,
  Rating, Avatar, Chip, TextField, MenuItem, IconButton, Tooltip,
} from '@mui/material';
import AddIcon        from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BusinessIcon   from '@mui/icons-material/Business';

import { fetchVendors, addVendor }  from '../../store/slices/vendorSlice';
import PageHeader       from '../../components/common/PageHeader';
import SearchBar        from '../../components/common/SearchBar';
import StatusChip       from '../../components/common/StatusChip';
import Loader           from '../../components/common/Loader';
import ErrorState       from '../../components/common/ErrorState';
import DataTable        from '../../components/common/DataTable';
import AddVendorModal   from './AddVendorModal';
import VendorDetailModal from './VendorDetailModal';

const CATEGORY_OPTIONS = ['all','Technology','Supplies','Facilities','Marketing','Legal','HR','Security'];
const STATUS_OPTIONS   = ['all','active','inactive'];

export default function VendorPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.vendor);

  const [search,         setSearch]         = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter,   setStatusFilter]   = useState('all');
  const [addOpen,        setAddOpen]        = useState(false);
  const [detailVendor,   setDetailVendor]   = useState(null);
  const [viewMode,       setViewMode]       = useState('table'); // 'table' | 'card'

  useEffect(() => { dispatch(fetchVendors()); }, [dispatch]);

  const filtered = useMemo(() => {
    return items.filter((v) => {
      const matchSearch   = v.name.toLowerCase().includes(search.toLowerCase()) ||
                            v.country.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || v.category === categoryFilter;
      const matchStatus   = statusFilter   === 'all' || v.status   === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [items, search, categoryFilter, statusFilter]);

  const summary = useMemo(() => ({
    total:    items.length,
    active:   items.filter((v) => v.status === 'active').length,
    inactive: items.filter((v) => v.status === 'inactive').length,
    spend:    items.reduce((s, v) => s + (v.spend || 0), 0),
  }), [items]);

  const handleAdd = useCallback((data) => {
    dispatch(addVendor({ ...data, id: `V-${Date.now()}`, status: 'active', contracts: 0, spend: 0 }));
    setAddOpen(false);
  }, [dispatch]);

  const columns = [
    { field: 'id',        headerName: 'Vendor ID', sortable: true },
    { field: 'name',      headerName: 'Name',      sortable: true,
      render: (val, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#0070E0', fontSize: '0.75rem' }}>{val?.[0]}</Avatar>
          <Typography variant="body2" fontWeight={600}>{val}</Typography>
        </Box>
      ),
    },
    { field: 'category',  headerName: 'Category',  sortable: true },
    { field: 'country',   headerName: 'Country',   sortable: true },
    { field: 'rating',    headerName: 'Rating',    sortable: true,
      render: (val) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Rating value={val} precision={0.5} readOnly size="small" />
          <Typography variant="caption">({val})</Typography>
        </Box>
      ),
    },
    { field: 'contracts', headerName: 'Contracts', sortable: true },
    { field: 'spend',     headerName: 'Total Spend', sortable: true,
      render: (val) => <Typography variant="body2" fontWeight={600}>₹{val?.toLocaleString()}</Typography>,
    },
    { field: 'status',    headerName: 'Status',    sortable: true,
      render: (val) => <StatusChip status={val} />,
    },
    { field: 'actions',   headerName: 'Actions',   sortable: false,
      render: (_, row) => (
        <Tooltip title="View Profile">
          <IconButton size="small" color="primary" onClick={() => setDetailVendor(row)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (loading) return <Loader message="Loading vendor data..." />;
  if (error)   return <ErrorState message={error} onRetry={() => dispatch(fetchVendors())} />;

  return (
    <Box>
      <PageHeader
        title="Vendor Governance"
        subtitle="Manage vendor profiles, contracts and performance"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Vendor Governance' }]}
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            Add Vendor
          </Button>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Vendors',  value: summary.total,                              color: '#0070E0' },
          { label: 'Active',         value: summary.active,                             color: '#2E7D32' },
          { label: 'Inactive',       value: summary.inactive,                           color: '#ED6C02' },
          { label: 'Total Spend',    value: `₹${(summary.spend/1000).toFixed(0)}K`,    color: '#7B1FA2' },
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

      {/* Filters */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or country..." />
            <TextField select size="small" label="Category" value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)} sx={{ minWidth: 140 }}>
              {CATEGORY_OPTIONS.map((c) => (
                <MenuItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</MenuItem>
              ))}
            </TextField>
            <TextField select size="small" label="Status" value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} sx={{ minWidth: 130 }}>
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {filtered.length} of {items.length} vendors
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Vendor Cards View */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {filtered.map((vendor) => (
          <Grid item xs={12} sm={6} md={4} key={vendor.id}>
            <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4 } }}
              onClick={() => setDetailVendor(vendor)}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Avatar sx={{ bgcolor: '#0070E0', width: 44, height: 44, fontWeight: 700 }}>
                    {vendor.name?.[0]}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight={700}>{vendor.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{vendor.category} · {vendor.country}</Typography>
                  </Box>
                  <StatusChip status={vendor.status} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <Rating value={vendor.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">({vendor.rating})</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Contracts</Typography>
                    <Typography variant="body2" fontWeight={700}>{vendor.contracts}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Total Spend</Typography>
                    <Typography variant="body2" fontWeight={700}>₹{(vendor.spend/1000).toFixed(0)}K</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Contact</Typography>
                    <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.72rem' }}>{vendor.contact}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modals */}
      <AddVendorModal open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAdd} />
      <VendorDetailModal open={!!detailVendor} onClose={() => setDetailVendor(null)} vendor={detailVendor} />
    </Box>
  );
}