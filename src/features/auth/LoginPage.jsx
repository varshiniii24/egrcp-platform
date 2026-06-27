import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Card, CardContent, TextField, Button,
  Typography, InputAdornment, IconButton, Divider, Alert,
} from '@mui/material';
import ShieldIcon        from '@mui/icons-material/Shield';
import VisibilityIcon    from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon          from '@mui/icons-material/Lock';
import PersonIcon        from '@mui/icons-material/Person';
import { setUser }       from '../../store/slices/authSlice';

// Mock credentials
const MOCK_USERS = [
  { username: 'admin',   password: 'admin123',  name: 'Admin User',    role: 'Administrator' },
  { username: 'auditor', password: 'audit123',  name: 'Sarah Auditor', role: 'Auditor'       },
  { username: 'user',    password: 'user123',   name: 'John User',     role: 'Viewer'        },
];

export default function LoginPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname ?? '/dashboard';

  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  const handleLogin = () => {
    setError('');
    if (!username || !password) { setError('Please enter username and password.'); return; }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const found = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        dispatch(setUser({ name: found.name, role: found.role, username: found.username }));
        navigate(from, { replace: true });
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 800);
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A2540 0%, #1B4080 60%, #0070E0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            <ShieldIcon sx={{ color: '#fff', fontSize: 40 }} />
            <Typography variant="h4" fontWeight={800} color="#fff">e-GRCP</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#B0C8E0' }}>
            Enterprise Governance, Risk & Compliance Platform
          </Typography>
        </Box>

        {/* Card */}
        <Card sx={{ borderRadius: 3, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700} color="primary.main" mb={0.5}>
              Sign In
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter your credentials to access the platform
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPass((p) => !p)}>
                      {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={loading}
              sx={{ py: 1.4, fontSize: '0.95rem', fontWeight: 700 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Divider sx={{ my: 3 }} />

            {/* Demo credentials hint */}
            <Box sx={{ backgroundColor: '#F4F6F9', borderRadius: 2, p: 1.5 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" mb={0.5}>
                Demo Credentials
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">👤 admin / admin123 — Administrator</Typography>
              <Typography variant="caption" color="text.secondary" display="block">👤 auditor / audit123 — Auditor</Typography>
              <Typography variant="caption" color="text.secondary" display="block">👤 user / user123 — Viewer</Typography>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="caption" color="#7A9CC0" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
          © 2025 e-GRCP Platform · All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}