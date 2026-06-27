import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header  from './Header';

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4F6F9' }}>
      <Sidebar open={sidebarOpen} />
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Header onMenuToggle={() => setSidebarOpen((p) => !p)} />
        <Toolbar sx={{ minHeight: '60px !important' }} />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}