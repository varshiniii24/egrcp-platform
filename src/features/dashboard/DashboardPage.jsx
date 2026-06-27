import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, Divider, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import ShoppingCartIcon  from '@mui/icons-material/ShoppingCart';
import PeopleIcon        from '@mui/icons-material/People';
import SecurityIcon      from '@mui/icons-material/Security';
import GavelIcon         from '@mui/icons-material/Gavel';
import ApprovalIcon      from '@mui/icons-material/Approval';
import FactCheckIcon     from '@mui/icons-material/FactCheck';
import WarningIcon       from '@mui/icons-material/Warning';

import { fetchDashboardStats } from '../../store/slices/dashboardSlice';
import PageHeader  from '../../components/common/PageHeader';
import KpiCard     from '../../components/common/KpiCard';
import Loader      from '../../components/common/Loader';
import ErrorState  from '../../components/common/ErrorState';
import StatusChip  from '../../components/common/StatusChip';

const PIE_COLORS = ['#D32F2F','#ED6C02','#0288D1','#2E7D32','#7B1FA2'];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const kpis = useMemo(() => {
    if (!stats) return [];
    return [
      { title: 'Total Procurement',  value: `₹${(stats.totalProcurement / 1000).toFixed(0)}K`, subtitle: 'FY 2025–26',        icon: <ShoppingCartIcon />, color: '#0070E0', trend: 'up',   trendValue: '+12% vs last quarter' },
      { title: 'Active Vendors',     value: stats.activeVendors,                                subtitle: '1 onboarding',      icon: <PeopleIcon />,       color: '#2E7D32', trend: 'up',   trendValue: '+2 this month'        },
      { title: 'Open Risks',         value: stats.openRisks,                                    subtitle: '1 critical',        icon: <SecurityIcon />,     color: '#D32F2F', trend: 'down', trendValue: '+1 this week'         },
      { title: 'Compliance Score',   value: `${stats.complianceScore}%`,                        subtitle: 'Across 6 frameworks',icon: <GavelIcon />,        color: '#7B1FA2', trend: 'up',   trendValue: '+3% this month'       },
      { title: 'Pending Approvals',  value: stats.pendingApprovals,                             subtitle: 'Needs action',      icon: <ApprovalIcon />,     color: '#ED6C02', trend: 'down', trendValue: '3 overdue'            },
      { title: 'Active Audits',      value: stats.activeAudits,                                 subtitle: 'In progress',       icon: <FactCheckIcon />,    color: '#0288D1', trend: 'up',   trendValue: '2 closing soon'       },
    ];
  }, [stats]);

  if (loading) return <Loader message="Loading dashboard..." />;
  if (error)   return <ErrorState message={error} onRetry={() => dispatch(fetchDashboardStats())} />;
  if (!stats)  return null;

  return (
    <Box>
      <PageHeader
        title="Executive Dashboard"
        subtitle="Real-time overview of governance, risk and compliance activity"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Dashboard' }]}
      />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={kpi.title}>
            <KpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>

        {/* Procurement Trend */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>Procurement Spend Trend</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={stats.procurementTrend}>
                  <defs>
                    <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#0070E0" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0070E0" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}K`} />
                  <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Spend']} />
                  <Area type="monotone" dataKey="value" stroke="#0070E0" strokeWidth={2} fill="url(#spendGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk by Category */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>Risk by Category</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={stats.riskByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={80} label={({ category, count }) => `${category}: ${count}`} labelLine={false}>
                    {stats.riskByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={2.5}>

        {/* Compliance by Framework */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>Compliance Score by Framework</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stats.complianceByFramework} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="framework" tick={{ fontSize: 12 }} width={70} />
                  <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {stats.complianceByFramework.map((entry, i) => (
                      <Cell key={i} fill={entry.score >= 80 ? '#2E7D32' : entry.score >= 60 ? '#ED6C02' : '#D32F2F'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>Recent Alerts</Typography>
              <List dense disablePadding>
                {[
                  { text: 'Data Breach Risk escalated to Critical', severity: 'critical', time: '2h ago' },
                  { text: 'PO-002 pending approval for 3 days',     severity: 'high',     time: '5h ago' },
                  { text: 'PCI-DSS review due in 7 days',           severity: 'medium',   time: '1d ago' },
                  { text: 'IT Security Audit findings: 7 issues',   severity: 'high',     time: '2d ago' },
                  { text: 'New vendor SecureNet Ltd onboarded',      severity: 'low',      time: '3d ago' },
                ].map((alert, i) => (
                  <React.Fragment key={i}>
                    <ListItem disablePadding sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <WarningIcon fontSize="small" sx={{ color: alert.severity === 'critical' || alert.severity === 'high' ? 'error.main' : alert.severity === 'medium' ? 'warning.main' : 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2">{alert.text}</Typography>}
                        secondary={<Typography variant="caption" color="text.secondary">{alert.time}</Typography>}
                      />
                      <StatusChip status={alert.severity} />
                    </ListItem>
                    {i < 4 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}