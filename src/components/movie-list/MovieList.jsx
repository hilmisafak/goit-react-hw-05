import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {movies.map((m) => (
        <li className={styles.card} key={m.id}>
          <Link
            to={`/movies/${m.id}`}
            state={{ from: location }}
            className={styles.cardLink}
          >
            <p className={styles.title}>{m.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
