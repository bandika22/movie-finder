import { useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import {
  SEARCH_MOVIES,
  GET_SIMILAR_MOVIES,
  type Movie,
} from '../graphql/movieQueries';

type Mode = 'search' | 'similar';

export function useMovieSearch() {
  const [searchMovies, searchResult] = useLazyQuery(SEARCH_MOVIES);
  const [getSimilar, similarResult] = useLazyQuery(GET_SIMILAR_MOVIES);
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

  const backToSearch = useCallback(() => {
    setMode('search');
  }, []);

  const movies: Movie[] =
    mode === 'search'
      ? (searchResult.data?.searchMovies ?? [])
      : (similarResult.data?.movie?.similar ?? []);

  const loading =
    mode === 'search' ? searchResult.loading : similarResult.loading;

  const called = searchResult.called || similarResult.called;

  return { movies, loading, called, search, showSimilar, backToSearch, mode };
}
