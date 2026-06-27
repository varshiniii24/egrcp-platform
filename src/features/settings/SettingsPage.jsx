import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Grid, Card, CardContent, Typography, TextField,
  Button, Avatar, Divider, Switch, FormControlLabel, Alert,
  List, ListItem, ListItemText, ListItemSecondaryAction,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SaveIcon    from '@mui/icons-material/Save';
import PersonIcon  from '@mui/icons-material/Person';
import LockIcon    from '@mui/icons-material/Lock';
import { setUser } from '../../store/slices/authSlice';
import PageHeader  from '../../components/common/PageHeader';

const profileSchema = yup.object({
  name:  yup.string().required('Name is required').min(2, 'Min 2 characters'),
  email: yup.string().email('Must be valid email').required('Email is required'),
  role:  yup.string().required('Role is required'),
  department: yup.string().required('Department is required'),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword:     yup.string().required('New password is required').min(6, 'Min 6 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm password'),
});

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [profileSaved,  setProfileSaved]  = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true, system: true, approvals: true, reports: false,
  });

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name:       user?.name       ?? '',
      email:      user?.email      ?? 'admin@egrcp.com',
      role:       user?.role       ?? '',
      department: user?.department ?? 'IT Department',
    },
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const handleProfileSave = (data) => {
    dispatch(setUser({ ...user, ...data }));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordSave = (data) => {
    setPasswordSaved(true);
    passwordForm.reset();
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, security and preferences"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Settings' }]}
      />

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <PersonIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>Profile Information</Typography>
              </Box>

              {profileSaved && <Alert severity="success" sx={{ mb: 2 }}>Profile updated successfully!</Alert>}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: '#0070E0', fontSize: '1.5rem', fontWeight: 700 }}>
                  {user?.name?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight={700}>{user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.role}</Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller name="name" control={profileForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Full Name"
                      error={!!profileForm.formState.errors.name}
                      helperText={profileForm.formState.errors.name?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller name="email" control={profileForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Email Address"
                      error={!!profileForm.formState.errors.email}
                      helperText={profileForm.formState.errors.email?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller name="role" control={profileForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Role" disabled />
                  )} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller name="department" control={profileForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Department"
                      error={!!profileForm.formState.errors.department}
                      helperText={profileForm.formState.errors.department?.message} />
                  )} />
                </Grid>
              </Grid>

              <Button variant="contained" startIcon={<SaveIcon />} sx={{ mt: 2 }}
                onClick={profileForm.handleSubmit(handleProfileSave)}>
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Password */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <LockIcon color="primary" />
                <Typography variant="h6" fontWeight={700}>Change Password</Typography>
              </Box>

              {passwordSaved && <Alert severity="success" sx={{ mb: 2 }}>Password changed successfully!</Alert>}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller name="currentPassword" control={passwordForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Current Password" type="password"
                      error={!!passwordForm.formState.errors.currentPassword}
                      helperText={passwordForm.formState.errors.currentPassword?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller name="newPassword" control={passwordForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="New Password" type="password"
                      error={!!passwordForm.formState.errors.newPassword}
                      helperText={passwordForm.formState.errors.newPassword?.message} />
                  )} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller name="confirmPassword" control={passwordForm.control} render={({ field }) => (
                    <TextField {...field} fullWidth label="Confirm Password" type="password"
                      error={!!passwordForm.formState.errors.confirmPassword}
                      helperText={passwordForm.formState.errors.confirmPassword?.message} />
                  )} />
                </Grid>
              </Grid>

              <Button variant="outlined" startIcon={<LockIcon />} sx={{ mt: 2 }}
                onClick={passwordForm.handleSubmit(handlePasswordSave)}>
                Update Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Preferences */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>Notification Preferences</Typography>
              <List disablePadding>
                {[
                  { key: 'email',     label: 'Email Notifications',  desc: 'Receive alerts via email'       },
                  { key: 'system',    label: 'System Alerts',        desc: 'In-app system notifications'    },
                  { key: 'approvals', label: 'Approval Requests',    desc: 'Notify on pending approvals'    },
                  { key: 'reports',   label: 'Report Generation',    desc: 'Notify when reports are ready'  },
                ].map((item, i, arr) => (
                  <React.Fragment key={item.key}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight={600}>{item.label}</Typography>}
                        secondary={<Typography variant="caption" color="text.secondary">{item.desc}</Typography>}
                      />
                      <Switch
                        checked={notifications[item.key]}
                        onChange={(e) => setNotifications((p) => ({ ...p, [item.key]: e.target.checked }))}
                        color="primary"
                      />
                    </ListItem>
                    {i < arr.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>System Information</Typography>
              {[
                { label: 'Platform Version', value: 'v1.0.0'      },
                { label: 'Environment',      value: 'Production'  },
                { label: 'Last Login',       value: 'Today, 07:05'},
                { label: 'Session Timeout',  value: '30 minutes'  },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                  <Typography variant="caption" fontWeight={600}>{item.value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}