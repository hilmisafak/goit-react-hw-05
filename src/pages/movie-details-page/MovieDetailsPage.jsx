import { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../../api/tmdb';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    getMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch(() => {});
  }, [movieId]);

  if (!movie) return <p className={styles.loading}>Loading...</p>;

  return (
    <section className={styles.wrapper}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ← Back to list
      </Link>
      <div className={styles.hero}>
        <img
          className={styles.poster}
          src={`${import.meta.env.VITE_TMDB_IMAGE_BASE}${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.meta}>
          <p className={styles.year}>
            {movie.release_date?.split('-')[0] ?? 'Upcoming'}
          </p>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.score}>
            User Score: <strong>{Math.round(movie.vote_average * 10)}%</strong>
          </p>
          <div className={styles.section}>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div className={styles.section}>
            <h2>Genres</h2>
            <p>{movie.genres.map((g) => g.name).join(', ')}</p>
          </div>
        </div>
      </div>

      <div className={styles.extra}>
        <p className={styles.extraTitle}>Additional information</p>
        <nav className={styles.extraNav}>
          <Link to="cast" className={styles.extraLink}>
            Cast
          </Link>
          <Link to="reviews" className={styles.extraLink}>
            Reviews
          </Link>
        </nav>
      </div>

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </section>
  );
}

export default MovieDetailsPage;
