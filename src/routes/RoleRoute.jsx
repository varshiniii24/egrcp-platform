import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

export default function RoleRoute({ children, allowedRoles = [] }) {
  const { user } = useSelector((state) => state.auth);

  if (allowedRoles.length === 0) return children;

  if (!allowedRoles.includes(user?.role)) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 2 }}>
        <LockIcon sx={{ fontSize: 56, color: 'error.main' }} />
        <Typography variant="h5" fontWeight={700}>Access Denied</Typography>
        <Typography variant="body2" color="text.secondary">
          You do not have permission to view this page.
        </Typography>
        <Button variant="contained" onClick={() => window.history.back()}>Go Back</Button>
      </Box>
    );
  }

  return children;
}