import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    globalLoading: false,
    snackbar: { open: false, message: '', severity: 'info' },
  },
  reducers: {
    toggleSidebar:    (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setGlobalLoading: (state, action) => { state.globalLoading = action.payload; },
    showSnackbar: (state, action) => {
      state.snackbar = { open: true, message: action.payload.message, severity: action.payload.severity ?? 'info' };
    },
    hideSnackbar: (state) => { state.snackbar.open = false; },
  },
});

export const { toggleSidebar, setGlobalLoading, showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;