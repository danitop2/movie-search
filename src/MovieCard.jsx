function MovieCard({ movie }) {
  const posterUrl = movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <article className="movie-card">
      <img
        src={posterUrl}
        alt={movie.Title}
        className="movie-poster"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
        }}
      />
      <h3 className="movie-title">{movie.Title}</h3>
      <p className="movie-year"><strong>Год:</strong> {movie.Year}</p>
    </article>
  );
}

export default MovieCard;