import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import {
  SEARCH_MOVIES,
  GET_SIMILAR_MOVIES,
  DISCOVER_MOVIES,
  type Movie,
} from '../graphql/movieQueries';

type Mode = 'search' | 'similar' | 'discover';

export function useMovieSearch() {
  const [searchMovies, searchResult] = useLazyQuery(SEARCH_MOVIES);
  const [getSimilar, similarResult] = useLazyQuery(GET_SIMILAR_MOVIES);
  const [discoverMovies, discoverResult] = useLazyQuery(DISCOVER_MOVIES);
  const [mode, setMode] = useState<Mode>('search');

  const search = useCallback(
    (query: string) => {
      setMode('search');
      searchMovies({ variables: { query } });
    },
    [searchMovies],
  );

  const showSimilar = useCallback(
    (movieId: string) => {
      setMode('similar');
      getSimilar({ variables: { id: movieId } });
    },
    [getSimilar],
  );

  const discoverByGenre = useCallback(
    (genreId: string) => {
      setMode('discover');
      discoverMovies({ variables: { genreId } });
    },
    [discoverMovies],
  );

  const backToSearch = useCallback(() => {
    setMode('search');
  }, []);

  const moviesByMode: Record<Mode, Movie[]> = {
    search: searchResult.data?.searchMovies ?? [],
    similar: similarResult.data?.movie?.similar ?? [],
    discover: discoverResult.data?.discoverMovies ?? [],
  };

  const movies = moviesByMode[mode];

  const loading =
    (mode === 'search' && searchResult.loading) ||
    (mode === 'similar' && similarResult.loading) ||
    (mode === 'discover' && discoverResult.loading);

  const called =
    searchResult.called || similarResult.called || discoverResult.called;

  return {
    movies,
    loading,
    called,
    search,
    showSimilar,
    discoverByGenre,
    backToSearch,
    mode,
  };
}
