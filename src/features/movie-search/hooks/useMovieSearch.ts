import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client/react';
import { SEARCH_MOVIES } from '../graphql/movieQueries';

export function useMovieSearch() {
  const [searchMovies, { data, loading, called }] =
    useLazyQuery(SEARCH_MOVIES);

  const search = useCallback(
    (query: string) => {
      searchMovies({ variables: { query } });
    },
    [searchMovies],
  );

  const movies = data?.searchMovies ?? [];

  return { movies, loading, called, search };
}
