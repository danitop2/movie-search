import { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';

const API_KEY = 'c8fe1f8c';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, loading, error, success
  const [error, setError] = useState(null);

  const fetchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setStatus('loading');
    setError(null);

    try {
      // Используем https:// вместо http://
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&apikey=${API_KEY}`
      );

      if (!res.ok) throw new Error('Ошибка сети');

      const data = await res.json();

      if (data.Error) {
        setMovies([]);
        setStatus('error');
        setError('Ничего не найдено');
        return;
      }

      setMovies(data.Search || []);
      setStatus('success');
    } catch (err) {
      setMovies([]);
      setStatus('error');
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  return (
    <div className="app">
      <h1 className="app-title">Поиск фильмов</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Введите название фильма..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="search-button"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Поиск...' : 'Найти'}
        </button>
      </form>

      {status === 'idle' && (
        <p className="status-message">Введите название фильма и нажмите «Найти».</p>
      )}

      {status === 'loading' && (
        <p className="status-message">Загрузка...</p>
      )}

      {status === 'error' && (
        <div className="error-message">
          <p>Ошибка: {error}</p>
        </div>
      )}

      {status === 'success' && movies.length === 0 && (
        <p className="status-message">Ничего не найдено по вашему запросу.</p>
      )}

      {status === 'success' && movies.length > 0 && (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;