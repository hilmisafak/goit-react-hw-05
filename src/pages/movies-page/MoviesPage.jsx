import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/movie-list/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    searchMovies(query)
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.query.value.trim();
    if (value) setSearchParams({ query: value });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchWrapper}>
          <input
            name="query"
            defaultValue={query}
            placeholder="Search for movies..."
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </div>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
