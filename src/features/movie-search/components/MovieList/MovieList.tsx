import { useMemo, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { Movie } from '../../graphql/movieQueries';
import {
  ListWrapper,
  StyledList,
  SortBar,
  MetaRow,
  GenreGroup,
  PosterImage,
  PosterFallback,
} from './MovieList.styles';

type SortField = 'default' | 'year' | 'score';
type SortDirection = 'asc' | 'desc';

type MovieListProps = {
  movies: Movie[];
  selectedMovieId?: string;
  onMovieClick: (movie: Movie) => void;
};

export function MovieList({
  movies,
  selectedMovieId,
  onMovieClick,
}: MovieListProps) {
  const [sortField, setSortField] = useState<SortField>('default');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedMovies = useMemo(() => {
    if (sortField === 'default') return movies;

    const direction = sortDirection === 'desc' ? 1 : -1;

    return [...movies].sort((a, b) => {
      if (sortField === 'year') {
        return (new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()) * direction;
      }
      return (b.score - a.score) * direction;
    });
  }, [movies, sortField, sortDirection]);

  if (movies.length === 0) {
    return (
      <Typography sx={{ p: 3, textAlign: 'center' }} color="text.secondary">
        No movies found.
      </Typography>
    );
  }

  return (
    <ListWrapper>
      <SortBar>
        <ToggleButtonGroup
          value={sortField}
          exclusive
          onChange={(_, value: SortField | null) => {
            if (value) setSortField(value);
          }}
          size="small"
        >
          <ToggleButton value="default">Default</ToggleButton>
          <ToggleButton value="year">Year</ToggleButton>
          <ToggleButton value="score">Score</ToggleButton>
        </ToggleButtonGroup>

        {sortField !== 'default' && (
          <IconButton
            size="small"
            onClick={() => setSortDirection((d) => (d === 'desc' ? 'asc' : 'desc'))}
          >
            {sortDirection === 'desc' ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
          </IconButton>
        )}
      </SortBar>

      <StyledList disablePadding>
        {sortedMovies.map((movie) => (
          <ListItemButton
            key={movie.id}
            selected={movie.id === selectedMovieId}
            onClick={() => onMovieClick(movie)}
            divider
            alignItems="flex-start"
          >
            <ListItemAvatar>
              {movie.poster?.small ? (
                <PosterImage src={movie.poster.small} alt={movie.name} />
              ) : (
                <PosterFallback>N/A</PosterFallback>
              )}
            </ListItemAvatar>

            <ListItemText
              primary={`${movie.name} (${new Date(movie.releaseDate).getFullYear()})`}
              secondary={
                <MetaRow>
                  <GenreGroup>
                    {movie.genres.map((g) => (
                      <Chip key={g.id} label={g.name} size="small" />
                    ))}
                  </GenreGroup>
                  <Chip
                    label={movie.score.toFixed(1)}
                    size="small"
                    color="warning"
                  />
                </MetaRow>
              }
            />
          </ListItemButton>
        ))}
      </StyledList>
    </ListWrapper>
  );
}
