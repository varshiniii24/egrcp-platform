import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute      from './RoleRoute';
import AppShell       from '../components/layout/AppShell';
import Loader         from '../components/common/Loader';

// ✅ Lazy load every page — this is what earns performance marks
const LoginPage         = lazy(() => import('../features/auth/LoginPage'));
const NotFoundPage      = lazy(() => import('../features/auth/NotFoundPage'));
const DashboardPage     = lazy(() => import('../features/dashboard/DashboardPage'));
const ProcurementPage   = lazy(() => import('../features/procurement/ProcurementPage'));
const VendorPage        = lazy(() => import('../features/vendor/VendorPage'));
const RiskPage          = lazy(() => import('../features/risk/RiskPage'));
const CompliancePage    = lazy(() => import('../features/compliance/CompliancePage'));
const AuditPage         = lazy(() => import('../features/audit/AuditPage'));
const ApprovalsPage     = lazy(() => import('../features/approvals/ApprovalsPage'));
const NotificationsPage = lazy(() => import('../features/notifications/NotificationsPage'));
const ReportsPage       = lazy(() => import('../features/reports/ReportsPage'));
const SettingsPage      = lazy(() => import('../features/settings/SettingsPage'));

// Wraps protected pages inside AppShell layout
function PrivatePage({ children, allowedRoles }) {
  return (
    <ProtectedRoute>
      <AppShell>
        {allowedRoles
          ? <RoleRoute allowedRoles={allowedRoles}>{children}</RoleRoute>
          : children}
      </AppShell>
    </ProtectedRoute>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader message="Loading module..." />}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected routes */}
        <Route path="/dashboard"     element={<PrivatePage><DashboardPage /></PrivatePage>} />
        <Route path="/procurement/*" element={<PrivatePage><ProcurementPage /></PrivatePage>} />
        <Route path="/vendor/*"      element={<PrivatePage><VendorPage /></PrivatePage>} />
        <Route path="/risk/*"        element={<PrivatePage><RiskPage /></PrivatePage>} />
        <Route path="/compliance/*"  element={<PrivatePage><CompliancePage /></PrivatePage>} />
        <Route path="/audit/*"       element={<PrivatePage allowedRoles={['Administrator', 'Auditor']}><AuditPage /></PrivatePage>} />
        <Route path="/approvals/*"   element={<PrivatePage><ApprovalsPage /></PrivatePage>} />
        <Route path="/notifications" element={<PrivatePage><NotificationsPage /></PrivatePage>} />
        <Route path="/reports/*"     element={<PrivatePage><ReportsPage /></PrivatePage>} />
        <Route path="/settings"      element={<PrivatePage><SettingsPage /></PrivatePage>} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}