import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Button, Chip, MenuItem, TextField,
  Typography, Card, CardContent, Grid, IconButton, Tooltip,
} from '@mui/material';
import AddIcon          from '@mui/icons-material/Add';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import CancelIcon       from '@mui/icons-material/Cancel';
import VisibilityIcon   from '@mui/icons-material/Visibility';

import {
  fetchProcurements,
  addProcurement,
  updateProcurement,
} from '../../store/slices/procurementSlice';

import PageHeader        from '../../components/common/PageHeader';
import DataTable         from '../../components/common/DataTable';
import SearchBar         from '../../components/common/SearchBar';
import StatusChip        from '../../components/common/StatusChip';
import Loader            from '../../components/common/Loader';
import ErrorState        from '../../components/common/ErrorState';
import ConfirmDialog     from '../../components/common/ConfirmDialog';
import AddProcurementModal from './AddProcurementModal';

const STATUS_OPTIONS = ['all', 'approved', 'pending', 'rejected', 'inreview'];

export default function ProcurementPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.procurement);

  const [search,      setSearch]      = useState('');
  const [statusFilter,setStatusFilter]= useState('all');
  const [addOpen,     setAddOpen]     = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // { type, id }

  useEffect(() => {
    dispatch(fetchProcurements());
  }, [dispatch]);

  // ✅ useMemo — only recomputes when items/search/filter change
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.vendor.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [items, search, statusFilter]);

  // ✅ useCallback — stable function reference
  const handleApprove = useCallback((id) => {
    setConfirmAction({ type: 'approve', id });
    setConfirmOpen(true);
  }, []);

  const handleReject = useCallback((id) => {
    setConfirmAction({ type: 'reject', id });
    setConfirmOpen(true);
  }, []);

  const handleConfirm = () => {
    if (!confirmAction) return;
    const { type, id } = confirmAction;
    const item = items.find((i) => i.id === id);
    if (item) {
      dispatch(updateProcurement({ ...item, status: type === 'approve' ? 'approved' : 'rejected' }));
    }
    setConfirmOpen(false);
    setConfirmAction(null);
  };

  const handleAdd = useCallback((data) => {
    const newPO = {
      ...data,
      id:     `PO-${Date.now()}`,
      status: 'pending',
      amount: Number(data.amount),
    };
    dispatch(addProcurement(newPO));
    setAddOpen(false);
  }, [dispatch]);

  // Summary cards
  const summary = useMemo(() => ({
    total:    items.length,
    approved: items.filter((i) => i.status === 'approved').length,
    pending:  items.filter((i) => i.status === 'pending').length,
    value:    items.reduce((sum, i) => sum + (i.amount || 0), 0),
  }), [items]);

  const columns = [
    { field: 'id',       headerName: 'PO ID',    sortable: true  },
    { field: 'title',    headerName: 'Title',    sortable: true  },
    { field: 'vendor',   headerName: 'Vendor',   sortable: true  },
    { field: 'category', headerName: 'Category', sortable: true  },
    { field: 'amount',   headerName: 'Amount',   sortable: true,
      render: (val) => <Typography variant="body2" fontWeight={600}>₹{val?.toLocaleString()}</Typography> },
    { field: 'date',     headerName: 'Date',     sortable: true  },
    { field: 'status',   headerName: 'Status',   sortable: true,
      render: (val) => <StatusChip status={val} /> },
    { field: 'actions',  headerName: 'Actions',  sortable: false,
      render: (_, row) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Approve">
            <span>
              <IconButton
                size="small" color="success"
                disabled={row.status === 'approved'}
                onClick={() => handleApprove(row.id)}
              >
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Reject">
            <span>
              <IconButton
                size="small" color="error"
                disabled={row.status === 'rejected'}
                onClick={() => handleReject(row.id)}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (loading) return <Loader message="Loading procurement data..." />;
  if (error)   return <ErrorState message={error} onRetry={() => dispatch(fetchProcurements())} />;

  return (
    <Box>
      <PageHeader
        title="Procurement"
        subtitle="Manage purchase orders, approvals and spend"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Procurement' }]}
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            New PO
          </Button>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Total Orders',   value: summary.total,                                    color: '#0070E0' },
          { label: 'Approved',       value: summary.approved,                                 color: '#2E7D32' },
          { label: 'Pending Review', value: summary.pending,                                  color: '#ED6C02' },
          { label: 'Total Value',    value: `₹${(summary.value / 1000).toFixed(0)}K`,        color: '#7B1FA2' },
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
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by title or vendor..."
            />
            <TextField
              select size="small" label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 140 }}
            >
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
              {filtered.length} of {items.length} records
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Data Table */}
      <DataTable
        columns={columns}
        rows={filtered}
        defaultSort="date"
        emptyMessage="No purchase orders found."
      />

      {/* Add PO Modal */}
      <AddProcurementModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title={confirmAction?.type === 'approve' ? 'Approve Purchase Order' : 'Reject Purchase Order'}
        message={`Are you sure you want to ${confirmAction?.type} this purchase order? This action will update the PO status.`}
        confirmLabel={confirmAction?.type === 'approve' ? 'Approve' : 'Reject'}
        severity={confirmAction?.type === 'approve' ? 'success' : 'error'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
}