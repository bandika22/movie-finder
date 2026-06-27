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
  }
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
    }
  }
`;
