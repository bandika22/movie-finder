import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = styled('form')({
  display: 'flex',
  gap: 12,
  width: '80%',
  margin: '0 auto',
});

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (searchTerm: string) => void;
};

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedSearchTerm = value.trim();

    if (!trimmedSearchTerm) {
      return;
    }

    onSearch(trimmedSearchTerm);
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a movie..."
        aria-label="Movie title"
      />

      <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
        Search
      </Button>
    </SearchForm>
  );
}
