import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusChip from '../components/common/StatusChip';

describe('StatusChip Component', () => {
  test('renders approved status', () => {
    render(<StatusChip status="approved" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  test('renders pending status', () => {
    render(<StatusChip status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('renders rejected status', () => {
    render(<StatusChip status="rejected" />);
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  test('renders critical status', () => {
    render(<StatusChip status="critical" />);
    expect(screen.getByText('Critical')).toBeInTheDocument();
  });

  test('renders high status', () => {
    render(<StatusChip status="high" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  test('renders compliant status', () => {
    render(<StatusChip status="compliant" />);
    expect(screen.getByText('Compliant')).toBeInTheDocument();
  });

  test('renders unknown status as-is', () => {
    render(<StatusChip status="custom-status" />);
    expect(screen.getByText('custom-status')).toBeInTheDocument();
  });

  test('renders open status', () => {
    render(<StatusChip status="open" />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });
});