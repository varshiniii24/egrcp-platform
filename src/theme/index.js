import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A2540',      // Deep navy — sidebar color
      light: '#1B4080',
      dark: '#061828',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0070E0',      // Salesforce blue — action buttons
      light: '#4DA3FF',
      dark: '#0050A0',
      contrastText: '#ffffff',
    },
    success: { main: '#2E7D32' },
    warning: { main: '#ED6C02' },
    error:   { main: '#D32F2F' },
    info:    { main: '#0288D1' },
    background: {
      default: '#F4F6F9',   // Light grey page background
      paper:   '#FFFFFF',
    },
    text: {
      primary:   '#1A1A2E',
      secondary: '#5A6A85',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: { fontSize: '2rem',    fontWeight: 700 },
    h2: { fontSize: '1.75rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem',  fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.1rem',  fontWeight: 600 },
    h6: { fontSize: '1rem',    fontWeight: 600 },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.8rem' },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 6 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          border: '1px solid #E8ECF0',
          borderRadius: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, fontSize: '0.75rem' } },
    },
  },
});

export default theme;