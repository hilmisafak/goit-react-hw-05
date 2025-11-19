import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/tmdb';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getMovieReviews(movieId)
      .then((data) => setReviews(data.results ?? []))
      .catch(() => setError('Unable to load reviews'))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  if (isLoading)
    return <p className={styles.placeholder}>Loading reviews...</p>;
  if (error) return <p className={styles.placeholder}>{error}</p>;
  if (!reviews.length) {
    return <p className={styles.placeholder}>No reviews available</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li className={styles.card} key={review.id}>
          <div className={styles.authorBlock}>
            <div className={styles.avatar}>
              {review.author?.slice(0, 2).toUpperCase() ?? 'NA'}
            </div>
            <div>
              <p className={styles.author}>{review.author}</p>
              <p className={styles.date}>
                {new Date(
                  review.updated_at ?? review.created_at,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
