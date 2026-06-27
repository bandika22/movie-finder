import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders the input and button', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search for a movie...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} onSearch={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('Search for a movie...'), {
      target: { value: 'fight club' },
    });

    expect(onChange).toHaveBeenCalledWith('fight club');
  });

  it('calls onSearch with trimmed value on submit', () => {
    const onSearch = vi.fn();
    render(<SearchBar value="  fight club  " onChange={vi.fn()} onSearch={onSearch} />);

    fireEvent.submit(screen.getByPlaceholderText('Search for a movie...').closest('form')!);

    expect(onSearch).toHaveBeenCalledWith('fight club');
  });

  it('does not call onSearch when value is empty', () => {
    const onSearch = vi.fn();
    render(<SearchBar value="   " onChange={vi.fn()} onSearch={onSearch} />);

    fireEvent.submit(screen.getByPlaceholderText('Search for a movie...').closest('form')!);

    expect(onSearch).not.toHaveBeenCalled();
  });
});
