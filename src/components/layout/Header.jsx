import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Box,
  Avatar, Badge, Tooltip, Menu, MenuItem, Divider,
} from '@mui/material';
import MenuIcon           from '@mui/icons-material/Menu';
import NotificationsIcon  from '@mui/icons-material/Notifications';
import LogoutIcon         from '@mui/icons-material/Logout';
import PersonIcon         from '@mui/icons-material/Person';
import { logout }         from '../../store/slices/authSlice';

export default function Header({ onMenuToggle }) {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user }  = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E8ECF0',
        color: '#1A1A2E',
        ml: '240px',
        width: 'calc(100% - 240px)',
      }}
    >
      <Toolbar sx={{ minHeight: '60px !important', px: 2 }}>
        <IconButton onClick={onMenuToggle} sx={{ mr: 1, color: '#5A6A85' }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0A2540', flexGrow: 1 }}>
          Enterprise Governance, Risk & Compliance Platform
        </Typography>

        {/* Notification Bell */}
        <Tooltip title="Notifications">
          <IconButton onClick={() => navigate('/notifications')} sx={{ color: '#5A6A85' }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Avatar Menu */}
        <Tooltip title="Account">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: '#0070E0', fontSize: '0.8rem' }}>
              {user?.name?.[0] ?? 'U'}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body2" fontWeight={700}>{user?.name ?? 'Admin User'}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.role ?? 'Administrator'}</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => { navigate('/settings'); setAnchorEl(null); }}>
            <PersonIcon fontSize="small" sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}