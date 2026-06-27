import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  title:  yup.string().required('Title is required').min(5, 'Min 5 characters'),
  vendor: yup.string().required('Vendor is required'),
  amount: yup.number().typeError('Must be a number').positive('Must be positive').required('Amount required'),
});

function TestForm({ onSubmit }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', vendor: '', amount: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller name="title" control={control} render={({ field }) => (
        <input {...field} placeholder="Title" data-testid="title-input" />
      )} />
      {errors.title && <span data-testid="title-error">{errors.title.message}</span>}

      <Controller name="vendor" control={control} render={({ field }) => (
        <input {...field} placeholder="Vendor" data-testid="vendor-input" />
      )} />
      {errors.vendor && <span data-testid="vendor-error">{errors.vendor.message}</span>}

      <Controller name="amount" control={control} render={({ field }) => (
        <input {...field} placeholder="Amount" data-testid="amount-input" type="number" />
      )} />
      {errors.amount && <span data-testid="amount-error">{errors.amount.message}</span>}

      <button type="submit" data-testid="submit-btn">Submit</button>
    </form>
  );
}

describe('Procurement Form Validation', () => {
  test('renders form fields', () => {
    render(<TestForm onSubmit={() => {}} />);
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('vendor-input')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(<TestForm onSubmit={() => {}} />);
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('title-error')).toBeInTheDocument();
      expect(screen.getByTestId('vendor-error')).toBeInTheDocument();
    });
  });

  test('shows min length error for title', async () => {
    render(<TestForm onSubmit={() => {}} />);
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Hi' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('title-error')).toHaveTextContent('Min 5 characters');
    });
  });

  test('calls onSubmit with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<TestForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByTestId('title-input'),  { target: { value: 'Valid Title Here' } });
    fireEvent.change(screen.getByTestId('vendor-input'), { target: { value: 'Valid Vendor' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '5000' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  test('shows error for negative amount', async () => {
    render(<TestForm onSubmit={() => {}} />);
    fireEvent.change(screen.getByTestId('title-input'),  { target: { value: 'Valid Title' } });
    fireEvent.change(screen.getByTestId('vendor-input'), { target: { value: 'Vendor' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '-100' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('amount-error')).toBeInTheDocument();
    });
  });
});