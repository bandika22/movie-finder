import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import type { Movie } from '../../graphql/movieQueries';
import type { WikipediaSummary } from '../../services/wikipedia.service';
import { Spinner } from '../Spinner/Spinner';
import {
  DetailRoot,
  Header,
  PosterImage,
  GenreRow,
  Actions,
} from './MovieDetail.styles';

type MovieDetailProps = {
  movie: Movie;
  wikiSummary: WikipediaSummary | null;
  wikiLoading: boolean;
  wikiError: boolean;
  onShowSimilar: () => void;
};

export function MovieDetail({
  movie,
  wikiSummary,
  wikiLoading,
  wikiError,
  onShowSimilar,
}: MovieDetailProps) {
  return (
    <DetailRoot>
      <Header>
        {movie.poster?.medium && (
          <PosterImage src={movie.poster.medium} alt={movie.name} />
        )}

        <Box>
          <Typography variant="h5">{movie.name}</Typography>

          <GenreRow>
            {movie.genres.map((g) => (
              <Chip key={g.id} label={g.name} size="small" />
            ))}
            <Chip
              label={movie.score.toFixed(1)}
              size="small"
              color="warning"
            />
          </GenreRow>
        </Box>
      </Header>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        {movie.overview}
      </Typography>

      <Actions>
        {wikiSummary && (
          <Button
            variant="contained"
            component={Link}
            href={wikiSummary.pageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on Wikipedia
          </Button>
        )}
        <Button variant="outlined" onClick={onShowSimilar}>
          Related Movies
        </Button>
      </Actions>

      <Divider />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Wikipedia
      </Typography>

      {wikiLoading ? (
        <Spinner />
      ) : wikiError ? (
        <Alert severity="warning">
          Failed to load Wikipedia summary.
        </Alert>
      ) : wikiSummary ? (
        <Typography variant="body2" color="text.secondary">
          {wikiSummary.extract}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic' }}>
          No Wikipedia article found.
        </Typography>
      )}
    </DetailRoot>
  );
}
