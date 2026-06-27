import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import TrendingUpIcon   from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function KpiCard({ title, value, subtitle, icon, color = '#0070E0', trend, trendValue }) {
  const isPositive = trend === 'up';
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={700} sx={{ mt: 0.5, color: '#1A1A2E' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
            {trendValue && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}>
                {isPositive
                  ? <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16 }} />
                  : <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16 }} />}
                <Typography variant="caption" color={isPositive ? 'success.main' : 'error.main'} fontWeight={600}>
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}18`, width: 48, height: 48 }}>
            <Box sx={{ color }}>{icon}</Box>
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}