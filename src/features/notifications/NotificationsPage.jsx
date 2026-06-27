import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Card, CardContent, Typography, Button, List,
  ListItem, ListItemText, ListItemIcon, Divider, IconButton, Chip, Tooltip,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon   from '@mui/icons-material/CheckCircle';
import DeleteIcon        from '@mui/icons-material/Delete';
import ErrorIcon         from '@mui/icons-material/Error';
import WarningIcon       from '@mui/icons-material/Warning';
import InfoIcon          from '@mui/icons-material/Info';

import {
  fetchNotifications, markAsRead, markAllAsRead, deleteNotification,
} from '../../store/slices/notificationSlice';
import PageHeader from '../../components/common/PageHeader';
import Loader     from '../../components/common/Loader';

const TYPE_ICON = {
  error:   <ErrorIcon   sx={{ color: '#D32F2F' }} />,
  warning: <WarningIcon sx={{ color: '#ED6C02' }} />,
  success: <CheckCircleIcon sx={{ color: '#2E7D32' }} />,
  info:    <InfoIcon    sx={{ color: '#0288D1' }} />,
};

const TYPE_COLOR = {
  error: '#FFEBEE', warning: '#FFF3E0', success: '#E8F5E9', info: '#E3F2FD',
};

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notification);
  const items   = notificationState?.items   ?? [];
  const loading = notificationState?.loading ?? false;

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const unreadCount = useMemo(() =>
    items.filter((n) => !n.read).length,
  [items]);

  if (loading) return <Loader message="Loading notifications..." />;

  return (
    <Box>
      <PageHeader
        title="Notification Center"
        subtitle="System alerts, warnings and messages"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Notifications' }]}
        actions={
          unreadCount > 0 && (
            <Button variant="outlined" startIcon={<CheckCircleIcon />}
              onClick={() => dispatch(markAllAsRead())}>
              Mark All Read
            </Button>
          )
        }
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Chip label={`${items.length} Total`} color="default" />
        <Chip label={`${unreadCount} Unread`} color="error" />
        <Chip label={`${items.length - unreadCount} Read`} color="success" />
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <NotificationsIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
              <Typography variant="h6" color="text.secondary" mt={1}>
                No notifications
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {items.map((n, i) => (
                <React.Fragment key={n.id}>
                  <ListItem
                    sx={{
                      px: 3, py: 1.5,
                      backgroundColor: n.read ? 'transparent' : TYPE_COLOR[n?.type] || '#F4F6F9',
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: '#F4F6F9' },
                    }}
                    onClick={() => !n.read && dispatch(markAsRead(n.id))}
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {!n.read && (
                          <Tooltip title="Mark as read">
                            <IconButton size="small"
                              onClick={(e) => { e.stopPropagation(); dispatch(markAsRead(n.id)); }}>
                              <CheckCircleIcon fontSize="small" color="success" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Delete">
                          <IconButton size="small"
                            onClick={(e) => { e.stopPropagation(); dispatch(deleteNotification(n.id)); }}>
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {TYPE_ICON[n?.type] || <InfoIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight={n.read ? 400 : 700}>
                            {n.title}
                          </Typography>
                          {!n.read && (
                            <Chip label="New" size="small" color="error"
                              sx={{ height: 18, fontSize: '0.65rem' }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {n.message}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {new Date(n.date).toLocaleString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {i < items.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}