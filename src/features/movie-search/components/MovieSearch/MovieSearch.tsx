import { useMovieSearch } from '../../hooks/useMovieSearch';
import { SearchBar } from '../SearchBar/SearchBar';
import { Spinner } from '../Spinner/Spinner';
import './MovieSearch.css';

export function MovieSearch() {
  const { movies, loading, called, search } = useMovieSearch();

  return (
    <div className="movie-search">
      <section className="movie-search__search-bar">
        <SearchBar onSearch={search} />
      </section>

      <section className="movie-search__content">
        <div className="movie-search__movie-list">
          {loading ? (
            <Spinner />
          ) : called && movies.length === 0 ? (
            <p className="movie-search__empty">No movies found.</p>
          ) : (
            <ul className="movie-search__results">
              {movies.map((movie) => (
                <li key={movie.id}>
                  <strong>{movie.name}</strong>
                  {' — '}
                  {movie.genres.map((g) => g.name).join(', ')}
                  {' — '}
                  {movie.score.toFixed(1)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
