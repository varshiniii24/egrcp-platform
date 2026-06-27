import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockRisks } from '../../mocks/mockData';

export const fetchRisks = createAsyncThunk(
  'risk/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      return mockRisks;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const riskSlice = createSlice({
  name: 'risk',
  initialState: { items: [], loading: false, error: null, selected: null },
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload; },
    addRisk: (state, action) => { state.items.unshift(action.payload); },
    updateRisk: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    closeRisk: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx !== -1) state.items[idx].status = 'closed';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisks.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchRisks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchRisks.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setSelected, addRisk, updateRisk, closeRisk } = riskSlice.actions;
export default riskSlice.reducer;