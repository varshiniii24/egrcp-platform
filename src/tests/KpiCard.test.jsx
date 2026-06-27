import React from 'react';
import { render, screen } from '@testing-library/react';
import KpiCard from '../components/common/KpiCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '@testing-library/jest-dom';

describe('KpiCard Component', () => {
  const defaultProps = {
    title: 'Total Procurement',
    value: '₹399K',
    subtitle: 'FY 2025-26',
    icon: <ShoppingCartIcon />,
    color: '#0070E0',
  };

  test('renders title correctly', () => {
    render(<KpiCard {...defaultProps} />);
    expect(screen.getByText('Total Procurement')).toBeInTheDocument();
  });

  test('renders value correctly', () => {
    render(<KpiCard {...defaultProps} />);
    expect(screen.getByText('₹399K')).toBeInTheDocument();
  });

  test('renders subtitle correctly', () => {
    render(<KpiCard {...defaultProps} />);
    expect(screen.getByText('FY 2025-26')).toBeInTheDocument();
  });

  test('renders trend up correctly', () => {
    render(<KpiCard {...defaultProps} trend="up" trendValue="+12% vs last quarter" />);
    expect(screen.getByText('+12% vs last quarter')).toBeInTheDocument();
  });

  test('renders trend down correctly', () => {
    render(<KpiCard {...defaultProps} trend="down" trendValue="-5% this month" />);
    expect(screen.getByText('-5% this month')).toBeInTheDocument();
  });

  test('renders without subtitle', () => {
    render(<KpiCard title="Test" value="10" icon={<ShoppingCartIcon />} color="#000" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});