import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockVendors } from '../../mocks/mockData';

export const fetchVendors = createAsyncThunk(
  'vendor/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      return mockVendors;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: { items: [], loading: false, error: null, selected: null },
  reducers: {
    setSelected: (state, action) => { state.selected = action.payload; },
    addVendor: (state, action) => { state.items.unshift(action.payload); },
    updateVendor: (state, action) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchVendors.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchVendors.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { setSelected, addVendor, updateVendor } = vendorSlice.actions;
export default vendorSlice.reducer;