import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, TableSortLabel,
  Paper, Box, Typography,
} from '@mui/material';

export default function DataTable({ columns, rows, defaultSort, emptyMessage = 'No records found.' }) {
  const [page, setPage]         = useState(0);
  const [rowsPerPage, setRows]  = useState(10);
  const [order, setOrder]       = useState('asc');
  const [orderBy, setOrderBy]   = useState(defaultSort ?? columns[0]?.field ?? '');

  const handleSort = (field) => {
    setOrder(orderBy === field && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const v1 = a[orderBy] ?? '';
      const v2 = b[orderBy] ?? '';
      return order === 'asc' ? (v1 > v2 ? 1 : -1) : (v1 < v2 ? 1 : -1);
    });
  }, [rows, order, orderBy]);

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F4F6F9' }}>
              {columns.map((col) => (
                <TableCell key={col.field} sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#5A6A85', whiteSpace: 'nowrap' }}>
                  {col.sortable !== false
                    ? <TableSortLabel active={orderBy === col.field} direction={orderBy === col.field ? order : 'asc'} onClick={() => handleSort(col.field)}>
                        {col.headerName}
                      </TableSortLabel>
                    : col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.length === 0
              ? <TableRow><TableCell colSpan={columns.length} align="center"><Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>{emptyMessage}</Typography></TableCell></TableRow>
              : paginated.map((row, idx) => (
                  <TableRow key={row.id ?? idx} hover sx={{ '&:last-child td': { border: 0 } }}>
                    {columns.map((col) => (
                      <TableCell key={col.field} sx={{ fontSize: '0.82rem' }}>
                        {col.render ? col.render(row[col.field], row) : row[col.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => { setRows(parseInt(e.target.value, 10)); setPage(0); }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
}