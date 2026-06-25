import './App.css';
import { MovieSearch } from './features/movie-search/components/MovieSearch/MovieSearch';

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        Header component
      </header>

      <main className="app__content">
       <MovieSearch />
      </main>
    </div>
  );
}