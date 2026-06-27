import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { Movie } from '../../graphql/movieQueries';

const StyledList = styled(List)({
  overflow: 'auto',
  height: '100%',
});

const MetaRow = styled('span')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 4,
});

const GenreGroup = styled('span')({
  display: 'flex',
  gap: 4,
  flexWrap: 'wrap',
});

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
        >
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
