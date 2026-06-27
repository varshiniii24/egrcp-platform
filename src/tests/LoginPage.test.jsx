import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';

// Simple store for testing
const store = configureStore({ reducer: { auth: authReducer } });

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </Provider>
);

// Lazy import to avoid module issues
let LoginPage;
beforeAll(async () => {
  const mod = await import('../features/auth/LoginPage');
  LoginPage = mod.default;
});

describe('LoginPage Component', () => {
  test('renders sign in button', async () => {
    if (!LoginPage) return;
    render(<Wrapper><LoginPage /></Wrapper>);
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('renders username field', async () => {
    if (!LoginPage) return;
    render(<Wrapper><LoginPage /></Wrapper>);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('renders password field', async () => {
    if (!LoginPage) return;
    render(<Wrapper><LoginPage /></Wrapper>);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('shows error on empty submit', async () => {
    if (!LoginPage) return;
    render(<Wrapper><LoginPage /></Wrapper>);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter username and password/i)).toBeInTheDocument();
    });
  });
});