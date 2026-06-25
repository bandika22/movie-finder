import { useMovieSearch } from '../../hooks/useMovieSearch';
import { MovieList } from '../MovieList/MovieList';
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
          ) : called ? (
            <MovieList movies={movies} />
          ) : null}
        </div>
      </section>
    </div>
  );
}
