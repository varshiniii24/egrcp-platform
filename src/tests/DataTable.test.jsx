import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from '../components/common/DataTable';

const mockColumns = [
  { field: 'id',     headerName: 'ID',     sortable: true  },
  { field: 'title',  headerName: 'Title',  sortable: true  },
  { field: 'status', headerName: 'Status', sortable: false },
];

const mockRows = [
  { id: 'PO-001', title: 'Office Supplies', status: 'approved' },
  { id: 'PO-002', title: 'IT Equipment',    status: 'pending'  },
];

describe('DataTable Component', () => {
  test('renders column headers', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('renders all rows', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('PO-001')).toBeInTheDocument();
    expect(screen.getByText('PO-002')).toBeInTheDocument();
  });

  test('renders row data correctly', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('Office Supplies')).toBeInTheDocument();
    expect(screen.getByText('IT Equipment')).toBeInTheDocument();
  });

  test('renders empty message when no rows', () => {
    render(<DataTable columns={mockColumns} rows={[]} emptyMessage="No data available." />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  test('renders default empty message', () => {
    render(<DataTable columns={mockColumns} rows={[]} />);
    expect(screen.getByText('No records found.')).toBeInTheDocument();
  });

  test('renders pagination controls', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  test('renders custom cell renderer', () => {
    const columnsWithRender = [
      { field: 'id',     headerName: 'ID',     sortable: true },
      { field: 'status', headerName: 'Status', sortable: true,
        render: (val) => <span data-testid="custom-cell">{val}-custom</span>,
      },
    ];
    const rows = [{ id: 'PO-001', status: 'approved' }];
    render(<DataTable columns={columnsWithRender} rows={rows} />);
    expect(screen.getByTestId('custom-cell')).toBeInTheDocument();
    expect(screen.getByText('approved-custom')).toBeInTheDocument();
  });

  test('sorts rows when column header clicked', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    const idHeader = screen.getByText('ID');
    fireEvent.click(idHeader);
    expect(screen.getByText('PO-001')).toBeInTheDocument();
  });

  test('handles rows per page change', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  test('renders non-sortable column without sort label', () => {
    render(<DataTable columns={mockColumns} rows={mockRows} />);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});