import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAudits } from '../../mocks/mockData';

export const fetchAudits = createAsyncThunk(
  'audit/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      return mockAudits;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const auditSlice = createSlice({
  name: 'audit',
  initialState: { items: [], loading: false, error: null, selected: null },
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload; },
    addAudit: (state, action) => { state.items.unshift(action.payload); },
    updateAudit: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudits.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchAudits.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchAudits.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setSelected, addAudit, updateAudit } = auditSlice.actions;
export default auditSlice.reducer;