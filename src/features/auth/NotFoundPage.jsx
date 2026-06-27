import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <SearchOffIcon sx={{ fontSize: 72, color: 'text.disabled' }} />
      <Typography variant="h3" fontWeight={700} color="text.secondary">404</Typography>
      <Typography variant="h6" color="text.secondary">Page not found</Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
    </Box>
  );
}