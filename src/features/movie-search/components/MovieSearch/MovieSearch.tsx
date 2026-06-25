import './MovieSearch.css';

export function MovieSearch() {
  return (
    <main className="movie-search">
      <section className="movie-search__search-bar">
        Search bar component
      </section>

      <section className="movie-search__content">
        <section className="movie-search__movie-list">
          Movie list component
        </section>

        <section className="movie-search__movie-details">
          Movie details component
        </section>
      </section>
    </main>
  );
}