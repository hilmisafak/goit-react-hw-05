import { useEffect, useState } from 'react';
import { getTrending } from '../../api/tmdb';
import MovieList from '../../components/movie-list/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTrending()
      .then((data) => setMovies(data.results || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <h1>Trending Today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}

export default HomePage;
