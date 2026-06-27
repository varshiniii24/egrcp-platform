import authReducer, { logout, setUser } from '../store/slices/authSlice';

describe('authSlice', () => {
  const initialState = { user: null, token: null, isAuthenticated: false };

  test('should return initial state', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('should handle setUser', () => {
    const user = { name: 'Admin User', role: 'Administrator' };
    const state = authReducer(initialState, setUser(user));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user.name).toBe('Admin User');
    expect(state.user.role).toBe('Administrator');
    expect(state.token).toBeTruthy();
  });

  test('should handle logout', () => {
    const loggedInState = {
      user: { name: 'Admin', role: 'Administrator' },
      token: 'mock-token',
      isAuthenticated: true,
    };
    const state = authReducer(loggedInState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  test('should not affect other state on setUser', () => {
    const user = { name: 'Test', role: 'Viewer' };
    const state = authReducer(initialState, setUser(user));
    expect(state.user.name).toBe('Test');
    expect(state.user.role).toBe('Viewer');
  });
});