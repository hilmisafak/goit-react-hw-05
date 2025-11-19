import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation.jsx';
import './App.css';

const HomePage = lazy(() => import('./pages/home-page/HomePage.jsx'));
const MoviesPage = lazy(() => import('./pages/movies-page/MoviesPage.jsx'));
const MovieDetailsPage = lazy(
  () => import('./pages/movie-details-page/MovieDetailsPage.jsx'),
);
const MovieCast = lazy(() => import('./components/movie-cast/MovieCast.jsx'));
const MovieReviews = lazy(
  () => import('./components/movie-reviews/MovieReviews.jsx'),
);
const NotFoundPage = lazy(
  () => import('./pages/not-found-page/NotFoundPage.jsx'),
);

const app = () => {
  return (
    <div className="app-shell">
      <Navigation />
      <main className="app-content">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default app;
