export const mockProcurements = [
  { id: 'PO-001', title: 'Office Supplies Q3',    vendor: 'OfficeMax Ltd',     amount: 12500,  status: 'approved', date: '2025-06-01', category: 'Supplies'    },
  { id: 'PO-002', title: 'IT Equipment Refresh',  vendor: 'TechPro Inc',       amount: 85000,  status: 'pending',  date: '2025-06-05', category: 'Technology'  },
  { id: 'PO-003', title: 'Facility Maintenance',  vendor: 'BuildRight Co',     amount: 34000,  status: 'approved', date: '2025-06-08', category: 'Facilities'  },
  { id: 'PO-004', title: 'Marketing Campaign',    vendor: 'CreativeEdge',      amount: 22000,  status: 'rejected', date: '2025-06-10', category: 'Marketing'   },
  { id: 'PO-005', title: 'Cloud Infrastructure',  vendor: 'CloudNova Systems', amount: 120000, status: 'approved', date: '2025-06-12', category: 'Technology'  },
  { id: 'PO-006', title: 'Legal Services Q2',     vendor: 'LexGroup Partners', amount: 45000,  status: 'pending',  date: '2025-06-14', category: 'Legal'       },
  { id: 'PO-007', title: 'Staff Training',        vendor: 'LearnPro Academy',  amount: 18000,  status: 'approved', date: '2025-06-15', category: 'HR'          },
  { id: 'PO-008', title: 'Security Audit Tools',  vendor: 'SecureNet Ltd',     amount: 67000,  status: 'inreview', date: '2025-06-18', category: 'Security'    },
];

export const mockVendors = [
  { id: 'V-001', name: 'TechPro Inc',       category: 'Technology', status: 'active',   rating: 4.5, contracts: 12, spend: 340000, country: 'USA',   contact: 'john@techpro.com'    },
  { id: 'V-002', name: 'OfficeMax Ltd',     category: 'Supplies',   status: 'active',   rating: 4.2, contracts: 8,  spend: 89000,  country: 'UK',    contact: 'info@officemax.com'  },
  { id: 'V-003', name: 'BuildRight Co',     category: 'Facilities', status: 'active',   rating: 3.8, contracts: 5,  spend: 210000, country: 'India', contact: 'ops@buildright.com'  },
  { id: 'V-004', name: 'CreativeEdge',      category: 'Marketing',  status: 'inactive', rating: 3.2, contracts: 3,  spend: 55000,  country: 'UAE',   contact: 'hello@creative.com'  },
  { id: 'V-005', name: 'CloudNova Systems', category: 'Technology', status: 'active',   rating: 4.8, contracts: 15, spend: 780000, country: 'USA',   contact: 'sales@cloudnova.com' },
  { id: 'V-006', name: 'LexGroup Partners', category: 'Legal',      status: 'active',   rating: 4.6, contracts: 7,  spend: 195000, country: 'UK',    contact: 'legal@lexgroup.com'  },
  { id: 'V-007', name: 'SecureNet Ltd',     category: 'Security',   status: 'active',   rating: 4.3, contracts: 9,  spend: 425000, country: 'India', contact: 'info@securenet.com'  },
];

export const mockRisks = [
  { id: 'R-001', title: 'Data Breach Risk',          category: 'Cybersecurity', severity: 'critical', status: 'open',   owner: 'IT Dept',      likelihood: 'High',   impact: 'Critical', date: '2025-05-10' },
  { id: 'R-002', title: 'Vendor Dependency Risk',    category: 'Operational',   severity: 'high',     status: 'open',   owner: 'Procurement',  likelihood: 'Medium', impact: 'High',     date: '2025-05-15' },
  { id: 'R-003', title: 'Regulatory Non-compliance', category: 'Compliance',    severity: 'high',     status: 'open',   owner: 'Legal',        likelihood: 'Low',    impact: 'High',     date: '2025-05-20' },
  { id: 'R-004', title: 'Budget Overrun',            category: 'Financial',     severity: 'medium',   status: 'closed', owner: 'Finance',      likelihood: 'Medium', impact: 'Medium',   date: '2025-05-22' },
  { id: 'R-005', title: 'Key Personnel Turnover',    category: 'HR',            severity: 'medium',   status: 'open',   owner: 'HR Dept',      likelihood: 'Medium', impact: 'Medium',   date: '2025-05-25' },
  { id: 'R-006', title: 'System Downtime',           category: 'Operational',   severity: 'high',     status: 'open',   owner: 'IT Dept',      likelihood: 'Low',    impact: 'High',     date: '2025-06-01' },
  { id: 'R-007', title: 'Supply Chain Disruption',   category: 'Operational',   severity: 'medium',   status: 'closed', owner: 'Procurement',  likelihood: 'Medium', impact: 'Medium',   date: '2025-06-05' },
];

export const mockCompliances = [
  { id: 'C-001', title: 'GDPR Data Protection',     framework: 'GDPR',     status: 'compliant',  dueDate: '2025-12-31', owner: 'Legal',   progress: 95, priority: 'high'   },
  { id: 'C-002', title: 'ISO 27001 Certification',  framework: 'ISO27001', status: 'inreview',   dueDate: '2025-09-30', owner: 'IT Dept', progress: 72, priority: 'high'   },
  { id: 'C-003', title: 'SOX Financial Controls',   framework: 'SOX',      status: 'compliant',  dueDate: '2025-12-31', owner: 'Finance', progress: 88, priority: 'high'   },
  { id: 'C-004', title: 'PCI-DSS Payment Security', framework: 'PCI-DSS',  status: 'pending',    dueDate: '2025-08-15', owner: 'IT Dept', progress: 45, priority: 'medium' },
  { id: 'C-005', title: 'HIPAA Privacy Rule',       framework: 'HIPAA',    status: 'compliant',  dueDate: '2025-12-31', owner: 'Legal',   progress: 91, priority: 'high'   },
  { id: 'C-006', title: 'NIST Cybersecurity',       framework: 'NIST',     status: 'inreview',   dueDate: '2025-10-01', owner: 'IT Dept', progress: 60, priority: 'medium' },
];

export const mockAudits = [
  { id: 'A-001', title: 'Q1 Financial Audit',        type: 'Financial',  status: 'closed',   auditor: 'Sarah K.',  startDate: '2025-01-10', endDate: '2025-01-25', findings: 3  },
  { id: 'A-002', title: 'IT Security Audit',         type: 'Security',   status: 'open',     auditor: 'Mike R.',   startDate: '2025-06-01', endDate: '2025-06-30', findings: 7  },
  { id: 'A-003', title: 'Procurement Process Audit', type: 'Operational',status: 'open',     auditor: 'Lisa M.',   startDate: '2025-06-10', endDate: '2025-07-10', findings: 2  },
  { id: 'A-004', title: 'Vendor Compliance Audit',   type: 'Compliance', status: 'pending',  auditor: 'John D.',   startDate: '2025-07-01', endDate: '2025-07-20', findings: 0  },
  { id: 'A-005', title: 'HR Policy Audit',           type: 'HR',         status: 'closed',   auditor: 'Anna T.',   startDate: '2025-03-01', endDate: '2025-03-15', findings: 1  },
];

export const mockNotifications = [
  { id: 'N-001', title: 'PO Approval Required',         message: 'PO-002 IT Equipment Refresh needs your approval.',  type: 'warning', read: false, date: '2025-06-24T09:00:00' },
  { id: 'N-002', title: 'Risk Escalated',               message: 'Data Breach Risk has been escalated to Critical.',  type: 'error',   read: false, date: '2025-06-24T08:30:00' },
  { id: 'N-003', title: 'Compliance Due Soon',          message: 'PCI-DSS compliance review due in 7 days.',          type: 'warning', read: false, date: '2025-06-23T17:00:00' },
  { id: 'N-004', title: 'Vendor Onboarded',             message: 'SecureNet Ltd has been successfully onboarded.',    type: 'success', read: true,  date: '2025-06-23T14:00:00' },
  { id: 'N-005', title: 'Audit Report Ready',           message: 'Q1 Financial Audit report is ready for download.',  type: 'info',    read: true,  date: '2025-06-22T11:00:00' },
  { id: 'N-006', title: 'System Maintenance Scheduled', message: 'Scheduled downtime on June 30, 2025 at 2:00 AM.',  type: 'info',    read: true,  date: '2025-06-21T10:00:00' },
];
export const mockDashboardStats = {
  totalProcurement:  398500,
  activeVendors:     6,
  openRisks:         5,
  complianceScore:   82,
  pendingApprovals:  3,
  activeAudits:      2,
  procurementTrend: [
    { month: 'Jan', value: 45000  },
    { month: 'Feb', value: 62000  },
    { month: 'Mar', value: 38000  },
    { month: 'Apr', value: 75000  },
    { month: 'May', value: 91000  },
    { month: 'Jun', value: 87500  },
  ],
  riskByCategory: [
    { category: 'Cybersecurity', count: 1 },
    { category: 'Operational',   count: 3 },
    { category: 'Compliance',    count: 1 },
    { category: 'Financial',     count: 1 },
    { category: 'HR',            count: 1 },
  ],
  complianceByFramework: [
    { framework: 'GDPR',    score: 95 },
    { framework: 'ISO27001',score: 72 },
    { framework: 'SOX',     score: 88 },
    { framework: 'PCI-DSS', score: 45 },
    { framework: 'HIPAA',   score: 91 },
  ],
};