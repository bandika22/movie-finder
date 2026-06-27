# Movie Finder

A front-end movie search application built with React and TypeScript. Search for movies using the TMDB GraphQL API, browse Wikipedia summaries, and explore related films.

## Features

- **Movie search** with real-time results from TMDB GraphQL sandbox
- **Movie details** with poster, genres, score, and overview
- **Wikipedia integration** — automatic summary lookup with link to full article
- **Related movies** — dual-state list that switches between search results and similar movies
- **Genre filter** — click a genre to filter search results or discover movies by category
- **Sortable list** — sort by year or score, ascending/descending
- **Loading spinners** and **error handling** for all async operations

## Tech Stack

- React 19 + TypeScript
- Apollo Client (GraphQL)
- Material-UI (MUI)
- Vite
- Vitest + React Testing Library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  features/
    movie-search/
      components/       # UI components (SearchBar, MovieList, MovieDetail, etc.)
      graphql/           # Apollo client setup and typed GraphQL queries
      hooks/             # Custom hooks (useMovieSearch, useWikipedia)
      services/          # Wikipedia REST API service
  test/                  # Test setup
```

## API

- **TMDB GraphQL**: https://tmdb.sandbox.zoosh.ie/dev/graphql
- **Wikipedia REST**: https://en.wikipedia.org/api/rest_v1/page/summary
