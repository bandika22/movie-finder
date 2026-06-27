import { gql, type TypedDocumentNode } from '@apollo/client';

export type Genre = {
  id: string;
  name: string;
};

export type Poster = {
  small: string | null;
  medium: string | null;
};

export type Movie = {
  id: string;
  name: string;
  overview: string;
  releaseDate: string;
  genres: Genre[];
  score: number;
  poster: Poster | null;
};

const MOVIE_FIELDS = gql`
  fragment MovieFields on Movie {
    id
    name
    overview
    releaseDate
    genres {
      id
      name
    }
    score
    poster {
      small
      medium
    }
  }
`;

export type SearchMoviesResult = {
  searchMovies: Movie[];
};

export type SearchMoviesVariables = {
  query: string;
};

export const SEARCH_MOVIES: TypedDocumentNode<
  SearchMoviesResult,
  SearchMoviesVariables
> = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      ...MovieFields
    }
  }
  ${MOVIE_FIELDS}
`;

export type SimilarMoviesResult = {
  movie: {
    similar: Movie[];
  };
};

export type SimilarMoviesVariables = {
  id: string;
};

export const GET_SIMILAR_MOVIES: TypedDocumentNode<
  SimilarMoviesResult,
  SimilarMoviesVariables
> = gql`
  query GetSimilarMovies($id: ID!) {
    movie(id: $id) {
      similar {
        ...MovieFields
      }
    }
  }
  ${MOVIE_FIELDS}
`;

export type MovieGenresResult = {
  movieGenres: Genre[];
};

export const MOVIE_GENRES: TypedDocumentNode<MovieGenresResult> = gql`
  query MovieGenres {
    movieGenres {
      id
      name
    }
  }
`;

export type DiscoverMoviesResult = {
  discoverMovies: Movie[];
};

export type DiscoverMoviesVariables = {
  genreId: string;
};

export const DISCOVER_MOVIES: TypedDocumentNode<
  DiscoverMoviesResult,
  DiscoverMoviesVariables
> = gql`
  query DiscoverMoviesByGenre($genreId: ID!) {
    discoverMovies(filter: { withGenres: { include: [$genreId] } }) {
      ...MovieFields
    }
  }
  ${MOVIE_FIELDS}
`;
