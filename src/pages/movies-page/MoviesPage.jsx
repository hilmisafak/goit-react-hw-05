import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/movie-list/MovieList';

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
    <>
      <form onSubmit={handleSubmit}>
        <input name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}

export default MoviesPage;
