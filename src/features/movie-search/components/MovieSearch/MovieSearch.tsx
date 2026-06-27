import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Genre, Movie } from '../../graphql/movieQueries';
import { MOVIE_GENRES } from '../../graphql/movieQueries';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { useWikipedia } from '../../hooks/useWikipedia';
import { GenreFilter } from '../GenreFilter/GenreFilter';
import { MovieDetail } from '../MovieDetail/MovieDetail';
import { MovieList } from '../MovieList/MovieList';
import { SearchBar } from '../SearchBar/SearchBar';
import { Spinner } from '../Spinner/Spinner';
import { Root, ContentGrid, Panel, BackButton } from './MovieSearch.styles';

export function MovieSearch() {
  const { movies, loading, called, error, search, showSimilar, discoverByGenre, backToSearch, mode } =
    useMovieSearch();
  const { summary, loading: wikiLoading, error: wikiError, lookup, clear } = useWikipedia();
  const { data: genresData } = useQuery(MOVIE_GENRES);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);

  const filteredMovies = useMemo(() => {
    if (!selectedGenreId || mode !== 'search') return movies;
    return movies.filter((m) => m.genres.some((g) => g.id === selectedGenreId));
  }, [movies, selectedGenreId, mode]);

  function handleSearch(query: string) {
    search(query);
    setSelectedMovie(null);
    setSelectedGenreId(null);
    clear();
  }

  function handleMovieClick(movie: Movie) {
    setSelectedMovie(movie);
    lookup(movie.name);
  }

  function handleShowSimilar(movie: Movie) {
    showSimilar(movie.id);
    setSelectedMovie(null);
    setSelectedGenreId(null);
    clear();
  }

  function handleGenreClick(genre: Genre) {
    const newGenreId = genre.id === selectedGenreId ? null : genre.id;
    setSelectedGenreId(newGenreId);
    setSelectedMovie(null);
    clear();

    if (!newGenreId) {
      if (searchTerm.trim()) {
        backToSearch();
      }
      return;
    }

    if (searchTerm.trim()) {
      backToSearch();
    } else {
      discoverByGenre(newGenreId);
    }
  }

  const displayedMovies = mode === 'search' ? filteredMovies : movies;

  return (
    <Root>
      <Box>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </Box>

      {genresData && (
        <GenreFilter
          genres={genresData.movieGenres}
          selectedGenreId={selectedGenreId}
          onGenreClick={handleGenreClick}
        />
      )}

      <ContentGrid>
        <Panel variant="outlined">
          {mode === 'similar' && (
            <BackButton
              fullWidth
              startIcon={<ArrowBackIcon />}
              onClick={backToSearch}
            >
              Back to search results
            </BackButton>
          )}

          {error ? (
            <Alert severity="error" sx={{ m: 2 }}>
              Failed to load movies. Please try again later.
            </Alert>
          ) : loading ? (
            <Spinner />
          ) : called ? (
            <MovieList
              movies={displayedMovies}
              selectedMovieId={selectedMovie?.id}
              onMovieClick={handleMovieClick}
            />
          ) : null}
        </Panel>

        <Panel variant="outlined">
          {selectedMovie && (
            <MovieDetail
              movie={selectedMovie}
              wikiSummary={summary}
              wikiLoading={wikiLoading}
              wikiError={wikiError}
              onShowSimilar={() => handleShowSimilar(selectedMovie)}
            />
          )}
        </Panel>
      </ContentGrid>
    </Root>
  );
}
