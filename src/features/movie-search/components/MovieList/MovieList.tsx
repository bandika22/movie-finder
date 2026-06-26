import type { Movie } from '../../graphql/movieQueries';
import './MovieList.css';

type MovieListProps = {
  movies: Movie[];
  selectedMovieId?: string;
  onMovieClick: (movie: Movie) => void;
};

export function MovieList({
  movies,
  selectedMovieId,
  onMovieClick,
}: MovieListProps) {
  if (movies.length === 0) {
    return <p className="movie-list__empty">No movies found.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={`movie-list__item ${movie.id === selectedMovieId ? 'movie-list__item--selected' : ''}`}
        >
          <button
            className="movie-list__link"
            onClick={() => onMovieClick(movie)}
          >
            <span className="movie-list__name">{movie.name}</span>
            <span className="movie-list__meta">
              <span className="movie-list__genres">
                {movie.genres.map((g) => g.name).join(', ')}
              </span>
              <span className="movie-list__score">
                {movie.score.toFixed(1)}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
