# 🛡️ e-GRCP — Enterprise Governance, Risk & Compliance Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC)
![MUI](https://img.shields.io/badge/Material_UI-6.0-007FFF)
![Tests](https://img.shields.io/badge/tests-35_passing-green)
![Coverage](https://img.shields.io/badge/coverage-74%25-yellow)

## 📋 Project Overview

e-GRCP is a full-featured **Enterprise Governance, Risk & Compliance Platform**
built with React 19. It provides organizations with a centralized platform to
manage procurement, vendor relationships, risks, compliance frameworks,
audits, approvals, and reporting — similar to SAP, Salesforce, and ServiceNow.

---

## 🚀 Live Demo

🔗 **[https://egrcp-platform.vercel.app](https://egrcp-platform.vercel.app)**

### Demo Credentials
| Username | Password | Role |
|---|---|---|
| admin | admin123 | Administrator |
| auditor | audit123 | Auditor |
| user | user123 | Viewer |

---

## 🏗️ Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI Framework |
| Vite | 6.0 | Build Tool |
| Redux Toolkit | 2.0 | State Management |
| React Router DOM | 7.0 | Client-side Routing |
| Material UI | 6.0 | UI Component Library |
| Axios | 1.0 | HTTP Client |
| React Hook Form | 7.0 | Form Management |
| Yup | 1.0 | Form Validation |
| Recharts | 2.0 | Data Visualization |
| Jest | 29 | Unit Testing |
| React Testing Library | 16 | Component Testing |

---

## 📦 Project Structure

---

## 🖥️ Modules

| Module | Description |
|---|---|
| 🏠 Dashboard | Executive KPIs, charts, alerts |
| 🛒 Procurement | Purchase orders, approvals |
| 👥 Vendor Governance | Vendor profiles, ratings |
| 🛡️ Risk Center | Risk register, severity matrix |
| ✅ Compliance | Framework tracking, radar chart |
| 📋 Audit Center | Audit planning, findings |
| ✔️ Approvals | Approval workbench |
| 🔔 Notifications | Alerts, mark as read |
| 📊 Reports | Report generation, download |
| ⚙️ Settings | Profile, password, preferences |

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/egrcp-platform.git

# Navigate to project
cd egrcp-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run unit tests
npm run test:coverage # Run tests with coverage
```

---

## 🏛️ Architecture

### State Management (Redux Toolkit)

### Routing Architecture

---

## 🧪 Testing

```bash
npm test
```

### Test Results

### Test Files
| File | Tests | Coverage |
|---|---|---|
| authSlice.test.js | 4 | ✅ |
| procurementSlice.test.js | 6 | ✅ |
| StatusChip.test.jsx | 8 | ✅ |
| KpiCard.test.jsx | 5 | ✅ |
| SearchBar.test.jsx | 5 | ✅ |
| DataTable.test.jsx | 6 | ✅ |

---

## 🎨 UI/UX Design

- **Design System**: Material UI v6
- **Color Palette**: Navy (#0A2540) + Salesforce Blue (#0070E0)
- **Typography**: Inter / Segoe UI
- **Pattern**: Enterprise SaaS (SAP / Salesforce / ServiceNow)
- **Responsive**: Mobile + Desktop

---

## ⚡ Performance Optimizations

| Technique | Used In |
|---|---|
| `React.lazy()` | All route components |
| `Suspense` | AppRoutes wrapper |
| `useMemo` | Filtered lists in all modules |
| `useCallback` | Action handlers |
| `React.memo` | Reusable components |
| Code Splitting | Automatic via lazy loading |

---

## 🚀 Deployment

Deployed on **Vercel**:
```bash
npm run build
vercel --prod
```

---

## 👨‍💻 Developer

- **Name**: Amrutha Varshini M S
- **Course**: React Enterprise Development
- **Institution**: Your College Name
- **Year**: 2025-26
- **Email**: amruthavarshini2404@gmail.com
- **GitHub**: https://github.com/varshiniii24
- **Live App**: https://egrcp-platform.vercel.app


## 📄 License

MIT License — © 2025 e-GRCP Platform