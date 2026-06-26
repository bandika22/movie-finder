import { useState } from 'react';
import type { Movie } from '../../graphql/movieQueries';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { useWikipedia } from '../../hooks/useWikipedia';
import { MovieDetail } from '../MovieDetail/MovieDetail';
import { MovieList } from '../MovieList/MovieList';
import { SearchBar } from '../SearchBar/SearchBar';
import { Spinner } from '../Spinner/Spinner';
import './MovieSearch.css';

export function MovieSearch() {
  const { movies, loading, called, search, showSimilar, backToSearch, mode } =
    useMovieSearch();
  const { summary, loading: wikiLoading, lookup, clear } = useWikipedia();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function handleSearch(query: string) {
    search(query);
    setSelectedMovie(null);
    clear();
  }

  function handleMovieClick(movie: Movie) {
    setSelectedMovie(movie);
    lookup(movie.name);
  }

  function handleShowSimilar(movie: Movie) {
    showSimilar(movie.id);
    setSelectedMovie(null);
    clear();
  }

  return (
    <div className="movie-search">
      <section className="movie-search__search-bar">
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="movie-search__content">
        <div className="movie-search__movie-list">
          {mode === 'similar' && (
            <button className="movie-search__back-btn" onClick={backToSearch}>
              &larr; Back to search results
            </button>
          )}

          {loading ? (
            <Spinner />
          ) : called ? (
            <MovieList
              movies={movies}
              selectedMovieId={selectedMovie?.id}
              onMovieClick={handleMovieClick}
            />
          ) : null}
        </div>

        <div className="movie-search__movie-details">
          {selectedMovie && (
            <MovieDetail
              movie={selectedMovie}
              wikiSummary={summary}
              wikiLoading={wikiLoading}
              onShowSimilar={() => handleShowSimilar(selectedMovie)}
            />
          )}
        </div>
      </section>
    </div>
  );
}
