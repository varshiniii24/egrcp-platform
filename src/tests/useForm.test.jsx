import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';

function TestHookForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({ defaultValues: { name: '', email: '' } });

  const nameValue = watch('name');

  return (
    <div>
      <input {...register('name', { required: 'Name required', minLength: { value: 3, message: 'Min 3 chars' } })}
        placeholder="Name" data-testid="name-input" />
      {errors.name && <span data-testid="name-error">{errors.name.message}</span>}

      <input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
        placeholder="Email" data-testid="email-input" />
      {errors.email && <span data-testid="email-error">{errors.email.message}</span>}

      <span data-testid="watch-value">{nameValue}</span>
      <span data-testid="dirty-state">{isDirty ? 'dirty' : 'clean'}</span>

      <button onClick={handleSubmit(() => {})} data-testid="submit-btn">Submit</button>
      <button onClick={() => reset()} data-testid="reset-btn">Reset</button>
    </div>
  );
}

describe('useForm Hook', () => {
  test('renders form inputs', () => {
    render(<TestHookForm />);
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  test('shows required errors on empty submit', async () => {
    render(<TestHookForm />);
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveTextContent('Name required');
      expect(screen.getByTestId('email-error')).toHaveTextContent('Email required');
    });
  });

  test('watch updates live value', () => {
    render(<TestHookForm />);
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John' } });
    expect(screen.getByTestId('watch-value')).toHaveTextContent('John');
  });

  test('tracks dirty state', () => {
    render(<TestHookForm />);
    expect(screen.getByTestId('dirty-state')).toHaveTextContent('clean');
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John' } });
    expect(screen.getByTestId('dirty-state')).toHaveTextContent('dirty');
  });

  test('shows min length error', async () => {
    render(<TestHookForm />);
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Jo' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('name-error')).toHaveTextContent('Min 3 chars');
    });
  });

  test('shows invalid email error', async () => {
    render(<TestHookForm />);
    fireEvent.change(screen.getByTestId('name-input'),  { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('email-error')).toHaveTextContent('Invalid email');
    });
  });
});