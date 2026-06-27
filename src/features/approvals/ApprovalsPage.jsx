import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography, Button,
  List, ListItem, ListItemIcon, Divider, Avatar,
} from '@mui/material';
import CheckCircleIcon  from '@mui/icons-material/CheckCircle';
import CancelIcon       from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { fetchProcurements, updateProcurement } from '../../store/slices/procurementSlice';
import PageHeader    from '../../components/common/PageHeader';
import Loader        from '../../components/common/Loader';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusChip    from '../../components/common/StatusChip';

export default function ApprovalsPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.procurement);
  const { user }           = useSelector((state) => state.auth);

  const [confirm, setConfirm] = useState(null);

  useEffect(() => { dispatch(fetchProcurements()); }, [dispatch]);

  const pending = useMemo(() =>
    items.filter((i) => i.status === 'pending' || i.status === 'inreview'),
  [items]);

  const handleConfirm = () => {
    if (!confirm) return;
    const item = items.find((i) => i.id === confirm.id);
    if (item) {
      dispatch(updateProcurement({
        ...item,
        status: confirm.type === 'approve' ? 'approved' : 'rejected',
      }));
    }
    setConfirm(null);
  };

  if (loading) return <Loader message="Loading approvals..." />;

  return (
    <Box>
      <PageHeader
        title="Approval Workbench"
        subtitle="Review and action pending approvals"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Approvals' }]}
      />

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Pending Approvals', value: pending.length,                                      color: '#ED6C02' },
          { label: 'Total POs',         value: items.length,                                        color: '#0070E0' },
          { label: 'Approved',          value: items.filter((i) => i.status === 'approved').length, color: '#2E7D32' },
          { label: 'Rejected',          value: items.filter((i) => i.status === 'rejected').length, color: '#D32F2F' },
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

      <Grid container spacing={2}>
        {/* Pending List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Pending Items ({pending.length})
              </Typography>

              {pending.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <CheckCircleIcon sx={{ fontSize: 56, color: 'success.main' }} />
                  <Typography variant="h6" color="text.secondary" mt={1}>
                    All caught up! No pending approvals.
                  </Typography>
                </Box>
              ) : (
                <List disablePadding>
                  {pending.map((item, i) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        sx={{
                          px: 0,
                          py: 2,
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        {/* Top row — icon + info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%', mb: 1.5 }}>
                          <Avatar sx={{ bgcolor: '#E3F2FD', width: 40, height: 40 }}>
                            <ShoppingCartIcon sx={{ color: '#0070E0', fontSize: 20 }} />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography variant="body2" fontWeight={700}>
                                {item.title}
                              </Typography>
                              <StatusChip status={item.status} />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {item.id} · {item.vendor} · ₹{item.amount?.toLocaleString()} · {item.date}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Bottom row — action buttons */}
                        <Box sx={{ display: 'flex', gap: 1.5, ml: 7 }}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => setConfirm({ type: 'approve', id: item.id })}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={() => setConfirm({ type: 'reject', id: item.id })}
                          >
                            Reject
                          </Button>
                        </Box>
                      </ListItem>

                      {i < pending.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Approver Info Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Approver Details
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: '#0070E0', width: 52, height: 52, fontSize: '1.3rem', fontWeight: 700 }}>
                  {user?.name?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight={700}>{user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.role}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="caption" color="text.secondary" fontWeight={700}
                display="block" mb={1.5} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Approval Authority
              </Typography>

              {['Purchase Orders', 'Vendor Contracts', 'Budget Requests'].map((auth) => (
                <Box key={auth} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />
                  <Typography variant="body2">{auth}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="caption" color="text.secondary" fontWeight={700}
                display="block" mb={1.5} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Summary
              </Typography>

              {[
                { label: 'Awaiting Action', value: pending.length,                                      color: '#ED6C02' },
                { label: 'Approved Today',  value: items.filter((i) => i.status === 'approved').length, color: '#2E7D32' },
                { label: 'Rejected Total',  value: items.filter((i) => i.status === 'rejected').length, color: '#D32F2F' },
              ].map((s) => (
                <Box key={s.label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                  <Typography variant="caption" fontWeight={700} sx={{ color: s.color }}>{s.value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirm}
        title={confirm?.type === 'approve' ? 'Approve Request' : 'Reject Request'}
        message={`Are you sure you want to ${confirm?.type} this purchase order?`}
        confirmLabel={confirm?.type === 'approve' ? 'Approve' : 'Reject'}
        severity={confirm?.type === 'approve' ? 'success' : 'error'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />
    </Box>
  );
}