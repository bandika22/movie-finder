import { type FormEvent, useState } from 'react';
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
  onSearch: (searchTerm: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

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
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for a movie..."
        aria-label="Movie title"
      />

      <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
        Search
      </Button>
    </SearchForm>
  );
}
