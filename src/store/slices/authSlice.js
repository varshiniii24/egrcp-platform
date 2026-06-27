import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,   // ← now false so login page shows
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = 'mock-token-' + Date.now();
      state.isAuthenticated = true;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;