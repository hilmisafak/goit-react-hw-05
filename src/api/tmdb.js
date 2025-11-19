import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN
    ? {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      }
    : { 'Content-Type': 'application/json' },
  params: API_KEY ? { api_key: API_KEY } : undefined,
  timeout: 10000,
});
export const getTrending = async () => {
  const { data } = await instance.get('/trending/movie/day');
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const { data } = await instance.get('/search/movie', {
    params: { query, include_adult: false, language: 'en-US', page },
  });
  return data;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCredits = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}/credits`);
  return data;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}/reviews`);
  return data;
};

export { IMAGE_BASE };
export default instance;
