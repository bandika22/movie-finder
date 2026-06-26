import type { Movie } from '../../graphql/movieQueries';
import type { WikipediaSummary } from '../../services/wikipedia.service';
import { Spinner } from '../Spinner/Spinner';
import './MovieDetail.css';

type MovieDetailProps = {
  movie: Movie;
  wikiSummary: WikipediaSummary | null;
  wikiLoading: boolean;
};

export function MovieDetail({
  movie,
  wikiSummary,
  wikiLoading,
}: MovieDetailProps) {
  return (
    <article className="movie-detail">
      <h2 className="movie-detail__title">{movie.name}</h2>

      <div className="movie-detail__info">
        <span className="movie-detail__genres">
          {movie.genres.map((g) => g.name).join(', ')}
        </span>
        <span className="movie-detail__score">
          Score: {movie.score.toFixed(1)}
        </span>
      </div>

      <p className="movie-detail__overview">{movie.overview}</p>

      <section className="movie-detail__wiki">
        <h3>Wikipedia</h3>
        {wikiLoading ? (
          <Spinner />
        ) : wikiSummary ? (
          <>
            <p>{wikiSummary.extract}</p>
            <a
              className="movie-detail__wiki-link"
              href={wikiSummary.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on Wikipedia
            </a>
          </>
        ) : (
          <p className="movie-detail__wiki-empty">
            No Wikipedia article found.
          </p>
        )}
      </section>
    </article>
  );
}
