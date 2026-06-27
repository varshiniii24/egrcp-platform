import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/common/SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar Component', () => {
  test('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Search vendors..." />);
    expect(screen.getByPlaceholderText('Search vendors...')).toBeInTheDocument();
  });

  test('displays current value', () => {
    render(<SearchBar value="test query" onChange={() => {}} />);
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new search' } });
    expect(mockOnChange).toHaveBeenCalledWith('new search');
  });

  test('calls onChange with empty string on clear', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="existing" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnChange).toHaveBeenCalledWith('');
  });
});