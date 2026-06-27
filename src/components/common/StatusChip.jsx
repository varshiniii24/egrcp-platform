import React from 'react';
import { Chip } from '@mui/material';

const statusConfig = {
  active:     { label: 'Active',      color: 'success' },
  inactive:   { label: 'Inactive',    color: 'default' },
  pending:    { label: 'Pending',     color: 'warning' },
  approved:   { label: 'Approved',    color: 'success' },
  rejected:   { label: 'Rejected',    color: 'error'   },
  open:       { label: 'Open',        color: 'info'    },
  closed:     { label: 'Closed',      color: 'default' },
  high:       { label: 'High',        color: 'error'   },
  medium:     { label: 'Medium',      color: 'warning' },
  low:        { label: 'Low',         color: 'success' },
  critical:   { label: 'Critical',    color: 'error'   },
  compliant:  { label: 'Compliant',   color: 'success' },
  draft:      { label: 'Draft',       color: 'default' },
  inreview:   { label: 'In Review',   color: 'info'    },
};

export default function StatusChip({ status }) {
  const cfg = statusConfig[status?.toLowerCase()] ?? { label: status, color: 'default' };
  return <Chip label={cfg.label} color={cfg.color} size="small" />;
}