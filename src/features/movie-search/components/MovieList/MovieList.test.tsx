import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieList } from './MovieList';
import type { Movie } from '../../graphql/movieQueries';

const mockMovies: Movie[] = [
  {
    id: '1',
    name: 'Old Movie',
    overview: 'An old movie',
    releaseDate: '1990-06-15T00:00:00.000Z',
    genres: [{ id: '28', name: 'Action' }],
    score: 8.5,
    poster: { small: 'https://example.com/poster1.jpg', medium: null },
  },
  {
    id: '2',
    name: 'New Movie',
    overview: 'A new movie',
    releaseDate: '2024-03-01T00:00:00.000Z',
    genres: [{ id: '35', name: 'Comedy' }, { id: '18', name: 'Drama' }],
    score: 6.2,
    poster: null,
  },
];

describe('MovieList', () => {
  it('shows empty message when no movies', () => {
    render(<MovieList movies={[]} onMovieClick={vi.fn()} />);
    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });

  it('renders movie names with year', () => {
    render(<MovieList movies={mockMovies} onMovieClick={vi.fn()} />);
    expect(screen.getByText('Old Movie (1990)')).toBeInTheDocument();
    expect(screen.getByText('New Movie (2024)')).toBeInTheDocument();
  });

  it('renders genres and scores as chips', () => {
    render(<MovieList movies={mockMovies} onMovieClick={vi.fn()} />);
    expect(screen.getAllByText('Action').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Comedy').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('8.5').length).toBeGreaterThanOrEqual(1);
  });

  it('calls onMovieClick when a movie is clicked', async () => {
    const onMovieClick = vi.fn();
    render(<MovieList movies={mockMovies} onMovieClick={onMovieClick} />);

    await userEvent.click(screen.getByText('Old Movie (1990)'));
    expect(onMovieClick).toHaveBeenCalledWith(mockMovies[0]);
  });

  it('renders poster image when available', () => {
    render(<MovieList movies={mockMovies} onMovieClick={vi.fn()} />);
    const images = screen.getAllByAltText('Old Movie');
    expect(images[0]).toHaveAttribute('src', 'https://example.com/poster1.jpg');
  });

  it('renders fallback when poster is missing', () => {
    render(<MovieList movies={mockMovies} onMovieClick={vi.fn()} />);
    expect(screen.getAllByText('N/A').length).toBeGreaterThanOrEqual(1);
  });

  it('sorts by score descending', async () => {
    render(<MovieList movies={mockMovies} onMovieClick={vi.fn()} />);

    await userEvent.click(screen.getByText('Score'));

    const listItems = screen.getAllByRole('button').filter(
      (btn) => btn.textContent?.includes('Movie ('),
    );
    expect(listItems[0]).toHaveTextContent('Old Movie');
    expect(listItems[1]).toHaveTextContent('New Movie');
  });
});
