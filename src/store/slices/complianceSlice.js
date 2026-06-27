import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockCompliances } from '../../mocks/mockData';

export const fetchCompliances = createAsyncThunk(
  'compliance/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      return mockCompliances;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const complianceSlice = createSlice({
  name: 'compliance',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    updateCompliance: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompliances.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchCompliances.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchCompliances.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { updateCompliance } = complianceSlice.actions;
export default complianceSlice.reducer;