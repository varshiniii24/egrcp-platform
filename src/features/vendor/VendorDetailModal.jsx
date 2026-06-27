import React from 'react';
import {
  Box, Typography, Grid, Divider, Chip, Rating, Avatar,
} from '@mui/material';
import Modal from '../../components/common/Modal';
import StatusChip from '../../components/common/StatusChip';

export default function VendorDetailModal({ open, onClose, vendor }) {
  if (!vendor) return null;

  const details = [
    { label: 'Vendor ID',         value: vendor.id },
    { label: 'Category',          value: vendor.category },
    { label: 'Country',           value: vendor.country },
    { label: 'Contact',           value: vendor.contact },
    { label: 'Active Contracts',  value: vendor.contracts },
    { label: 'Total Spend',       value: `₹${vendor.spend?.toLocaleString()}` },
  ];

  return (
    <Modal open={open} onClose={onClose} title="Vendor Profile" maxWidth="sm">
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: '#0070E0', fontSize: '1.4rem', fontWeight: 700 }}>
          {vendor.name?.[0]}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>{vendor.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <Rating value={vendor.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">({vendor.rating})</Typography>
            <StatusChip status={vendor.status} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        {details.map((d) => (
          <Grid item xs={6} key={d.label}>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
              {d.label}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.3 }}>
              {d.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Modal>
  );
}