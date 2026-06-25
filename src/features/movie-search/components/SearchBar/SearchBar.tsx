import { type FormEvent, useState } from 'react';
import './SearchBar.css';

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
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for a movie..."
        aria-label="Movie title"
      />

      <button className="search-bar__button" type="submit">
        Search
      </button>
    </form>
  );
}
