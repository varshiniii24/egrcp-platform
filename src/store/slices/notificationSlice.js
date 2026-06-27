import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockNotifications } from '../../mocks/mockData';

export const fetchNotifications = createAsyncThunk(
  'notification/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 300));
      return mockNotifications;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    markAsRead: (state, action) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) item.read = true;
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => { n.read = true; });
    },
    deleteNotification: (state, action) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending,   (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchNotifications.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { markAsRead, markAllAsRead, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;