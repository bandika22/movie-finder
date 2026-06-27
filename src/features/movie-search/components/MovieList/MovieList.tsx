import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { Movie } from '../../graphql/movieQueries';
import {
  StyledList,
  MetaRow,
  GenreGroup,
  PosterImage,
  PosterFallback,
} from './MovieList.styles';

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
  if (movies.length === 0) {
    return (
      <Typography sx={{ p: 3, textAlign: 'center' }} color="text.secondary">
        No movies found.
      </Typography>
    );
  }

  return (
    <StyledList disablePadding>
      {movies.map((movie) => (
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
            primary={movie.name}
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
  );
}
