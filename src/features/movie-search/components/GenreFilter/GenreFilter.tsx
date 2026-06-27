import Chip from '@mui/material/Chip';
import type { Genre } from '../../graphql/movieQueries';
import { FilterRow } from './GenreFilter.styles';

type GenreFilterProps = {
  genres: Genre[];
  selectedGenreId: string | null;
  onGenreClick: (genre: Genre) => void;
};

export function GenreFilter({
  genres,
  selectedGenreId,
  onGenreClick,
}: GenreFilterProps) {
  return (
    <FilterRow>
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          size="small"
          color={genre.id === selectedGenreId ? 'primary' : 'default'}
          variant={genre.id === selectedGenreId ? 'filled' : 'outlined'}
          onClick={() => onGenreClick(genre)}
          clickable
        />
      ))}
    </FilterRow>
  );
}
