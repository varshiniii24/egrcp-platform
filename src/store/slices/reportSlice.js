import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mockReports = [
  { id: 'RPT-001', title: 'Q2 Procurement Summary',    type: 'Procurement', status: 'ready',      date: '2025-06-01', size: '2.4 MB' },
  { id: 'RPT-002', title: 'Risk Assessment Report',    type: 'Risk',        status: 'ready',      date: '2025-06-05', size: '1.8 MB' },
  { id: 'RPT-003', title: 'Compliance Status Report',  type: 'Compliance',  status: 'generating', date: '2025-06-20', size: '-'      },
  { id: 'RPT-004', title: 'Vendor Performance Report', type: 'Vendor',      status: 'ready',      date: '2025-06-10', size: '3.1 MB' },
  { id: 'RPT-005', title: 'Annual Audit Summary',      type: 'Audit',       status: 'ready',      date: '2025-06-15', size: '5.2 MB' },
];

export const fetchReports = createAsyncThunk(
  'report/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((res) => setTimeout(res, 500));
      return mockReports;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchReports.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchReports.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default reportSlice.reducer;