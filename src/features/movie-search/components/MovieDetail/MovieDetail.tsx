import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { Movie } from '../../graphql/movieQueries';
import type { WikipediaSummary } from '../../services/wikipedia.service';
import { Spinner } from '../Spinner/Spinner';

const DetailRoot = styled(Box)({
  padding: 20,
  overflow: 'auto',
  height: '100%',
  boxSizing: 'border-box',
});

const GenreRow = styled(Box)({
  display: 'flex',
  gap: 8,
  marginBottom: 16,
  alignItems: 'center',
});

const Actions = styled(Box)({
  display: 'flex',
  gap: 12,
  marginBottom: 24,
});

type MovieDetailProps = {
  movie: Movie;
  wikiSummary: WikipediaSummary | null;
  wikiLoading: boolean;
  onShowSimilar: () => void;
};

export function MovieDetail({
  movie,
  wikiSummary,
  wikiLoading,
  onShowSimilar,
}: MovieDetailProps) {
  return (
    <DetailRoot>
      <Typography variant="h5" gutterBottom>
        {movie.name}
      </Typography>

      <GenreRow>
        {movie.genres.map((g) => (
          <Chip key={g.id} label={g.name} size="small" />
        ))}
        <Chip label={movie.score.toFixed(1)} size="small" color="warning" />
      </GenreRow>

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
      ) : wikiSummary ? (
        <Typography variant="body2" color="text.secondary">
          {wikiSummary.extract}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.disabled" fontStyle="italic">
          No Wikipedia article found.
        </Typography>
      )}
    </DetailRoot>
  );
}
