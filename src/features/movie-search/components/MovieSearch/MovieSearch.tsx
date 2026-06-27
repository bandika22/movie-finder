import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Movie } from '../../graphql/movieQueries';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { useWikipedia } from '../../hooks/useWikipedia';
import { MovieDetail } from '../MovieDetail/MovieDetail';
import { MovieList } from '../MovieList/MovieList';
import { SearchBar } from '../SearchBar/SearchBar';
import { Spinner } from '../Spinner/Spinner';

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  height: '100%',
  maxWidth: 1400,
  margin: '0 auto',
  padding: 24,
  boxSizing: 'border-box',
});

const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  flex: 1,
  minHeight: 0,
});

const Panel = styled(Paper)({
  minHeight: 0,
  overflow: 'hidden',
});

const BackButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
}));

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
