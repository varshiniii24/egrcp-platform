import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
      <Typography variant="h2">⚠️</Typography>
      <Typography variant="h6" color="text.secondary">{message}</Typography>
      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
}