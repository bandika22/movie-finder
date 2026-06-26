import './App.css';
import { MovieSearch } from './features/movie-search/components/MovieSearch/MovieSearch';

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Movie Finder</h1>
      </header>

      <main className="app__content">
        <MovieSearch />
      </main>
    </div>
  );
}
