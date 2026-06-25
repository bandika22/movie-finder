import type { Movie } from '../../graphql/movieQueries';
import './MovieList.css';

type MovieListProps = {
  movies: Movie[];
};

export function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="movie-list__empty">No movies found.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-list__item">
          <span className="movie-list__name">{movie.name}</span>
          <span className="movie-list__meta">
            <span className="movie-list__genres">
              {movie.genres.map((g) => g.name).join(', ')}
            </span>
            <span className="movie-list__score">
              {movie.score.toFixed(1)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
