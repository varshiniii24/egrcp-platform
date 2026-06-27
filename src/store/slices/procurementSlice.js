import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockProcurements } from '../../mocks/mockData';

export const fetchProcurements = createAsyncThunk(
  'procurement/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      return mockProcurements;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selected: null,
  },
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload; },
    addProcurement: (state, action) => { state.items.unshift(action.payload); },
    updateProcurement: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteProcurement: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcurements.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchProcurements.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProcurements.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setSelected, addProcurement, updateProcurement, deleteProcurement } = procurementSlice.actions;
export default procurementSlice.reducer;