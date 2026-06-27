# 🏛️ e-GRCP Architecture Document

## 1. System Overview

e-GRCP is a Single Page Application (SPA) built with React 19.
It uses a feature-based architecture where each business domain
is a self-contained module.

## 2. Architecture Diagram

## 3. Redux Data Flow

## 4. Component Hierarchy

## 5. Security Architecture

## 6. Performance Strategy

| Strategy | Implementation |
|---|---|
| Code Splitting | React.lazy() on all pages |
| Memoization | useMemo for filtered lists |
| Callback Stability | useCallback for handlers |
| Bundle Optimization | Vite automatic chunking |

## 7. Reusable Component Library

| Component | Props | Purpose |
|---|---|---|
| DataTable | columns, rows, defaultSort | Sortable paginated table |
| KpiCard | title, value, icon, trend | Metric display card |
| StatusChip | status | Color coded status badge |
| SearchBar | value, onChange, placeholder | Search input |
| Modal | open, onClose, title, actions | Dialog wrapper |
| ConfirmDialog | open, title, message, onConfirm | Confirmation dialog |
| PageHeader | title, subtitle, breadcrumbs, actions | Page title bar |
| Loader | message | Loading spinner |
| ErrorState | message, onRetry | Error display |