import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography, Divider,
  Tooltip, Collapse,
} from '@mui/material';
import DashboardIcon        from '@mui/icons-material/Dashboard';
import ShoppingCartIcon     from '@mui/icons-material/ShoppingCart';
import PeopleIcon           from '@mui/icons-material/People';
import SecurityIcon         from '@mui/icons-material/Security';
import GavelIcon            from '@mui/icons-material/Gavel';
import FactCheckIcon        from '@mui/icons-material/FactCheck';
import ApprovalIcon         from '@mui/icons-material/Approval';
import NotificationsIcon    from '@mui/icons-material/Notifications';
import AssessmentIcon       from '@mui/icons-material/Assessment';
import SettingsIcon         from '@mui/icons-material/Settings';
import ExpandLess           from '@mui/icons-material/ExpandLess';
import ExpandMore           from '@mui/icons-material/ExpandMore';
import ShieldIcon           from '@mui/icons-material/Shield';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard',     icon: <DashboardIcon />,     path: '/dashboard' },
  { label: 'Procurement',   icon: <ShoppingCartIcon />,  path: '/procurement' },
  { label: 'Vendor Gov.',   icon: <PeopleIcon />,        path: '/vendor' },
  { label: 'Risk Center',   icon: <SecurityIcon />,      path: '/risk' },
  { label: 'Compliance',    icon: <GavelIcon />,         path: '/compliance' },
  { label: 'Audit Center',  icon: <FactCheckIcon />,     path: '/audit' },
  { label: 'Approvals',     icon: <ApprovalIcon />,      path: '/approvals' },
  { label: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { label: 'Reports',       icon: <AssessmentIcon />,    path: '/reports' },
  { label: 'Settings',      icon: <SettingsIcon />,      path: '/settings' },
];

export default function Sidebar({ open }) {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#0A2540',
          color: '#ffffff',
          borderRight: 'none',
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 2.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShieldIcon sx={{ color: '#0070E0', fontSize: 28 }} />
        <Box>
          <Typography variant="h6" sx={{ color: '#fff', lineHeight: 1, fontWeight: 700, fontSize: '0.95rem' }}>
            e-GRCP
          </Typography>
          <Typography variant="caption" sx={{ color: '#7A9CC0', fontSize: '0.65rem' }}>
            Enterprise Platform
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#1B4080' }} />

      {/* Nav */}
      <List sx={{ px: 1, mt: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.3 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  backgroundColor: active ? '#0070E0' : 'transparent',
                  '&:hover': { backgroundColor: active ? '#0060C0' : '#1B4080' },
                }}
              >
                <ListItemIcon sx={{ color: active ? '#fff' : '#7A9CC0', minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.82rem',
                    fontWeight: active ? 700 : 400,
                    color: active ? '#fff' : '#B0C8E0',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ mt: 'auto', px: 2.5, py: 2, borderTop: '1px solid #1B4080' }}>
        <Typography variant="caption" sx={{ color: '#5A7A9A', fontSize: '0.65rem' }}>
          v1.0.0 · FY 2025–26
        </Typography>
      </Box>
    </Drawer>
  );
}