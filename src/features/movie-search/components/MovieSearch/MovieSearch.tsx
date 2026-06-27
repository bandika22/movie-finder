import { useState } from 'react';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Movie } from '../../graphql/movieQueries';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { useWikipedia } from '../../hooks/useWikipedia';
import { MovieDetail } from '../MovieDetail/MovieDetail';
import { MovieList } from '../MovieList/MovieList';
import { SearchBar } from '../SearchBar/SearchBar';
import { Spinner } from '../Spinner/Spinner';
import { Root, ContentGrid, Panel, BackButton } from './MovieSearch.styles';

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
    <Root>
      <Box>
        <SearchBar onSearch={handleSearch} />
      </Box>

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

          {loading ? (
            <Spinner />
          ) : called ? (
            <MovieList
              movies={movies}
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
              onShowSimilar={() => handleShowSimilar(selectedMovie)}
            />
          )}
        </Panel>
      </ContentGrid>
    </Root>
  );
}
