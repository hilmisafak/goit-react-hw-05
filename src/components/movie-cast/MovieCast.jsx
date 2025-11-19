import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieCredits } from '../../api/tmdb';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then((data) => setCast(data.cast || []));
  }, [movieId]);

  if (!cast.length) {
    return <p className={styles.placeholder}>No cast info</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map((member) => (
        <li className={styles.card} key={member.cast_id ?? member.credit_id}>
          <p className={styles.name}>{member.name}</p>
          <p className={styles.character}>{member.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
