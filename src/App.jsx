import { useState, useEffect } from "react";

import { searchMovies } from "apis/movies";

const SearchIcon = () => (
  <svg
    aria-hidden
    className="h-5 w-5 shrink-0 text-gray-400"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const MovieCard = ({ movie }) => (
  <article className="flex flex-col overflow-hidden rounded-lg bg-white pb-5 shadow-sm">
    <div className="relative overflow-hidden bg-gray-200 pb-[66.666%]">
      <img
        alt={movie.Title}
        className="absolute inset-0 h-full w-full object-cover"
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }
      />
    </div>
    <h2 className="mt-4 px-4 text-base font-semibold leading-tight text-gray-800">
      {movie.Title}
    </h2>
    <p className="mt-1.5 px-4 text-sm leading-snug text-meta-gray">
      {movie.Type} • {movie.Year}
    </p>
    <button
      className="focus:outline-none mx-4 mt-4 mt-auto cursor-pointer rounded border-0 bg-btn-blue py-2 text-left text-[0.9375rem] font-bold text-white underline hover:bg-btn-blue-hover focus:ring-2 focus:ring-link-blue focus:ring-offset-2"
      type="button"
    >
      View details
    </button>
  </article>
);

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);

      return () => {};
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const { Search } = await searchMovies(query);
        setMovies(Search || []);
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-page-bg px-4 pb-12 pt-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8">
          <div className="mx-auto flex max-w-[480px] items-center gap-3 rounded-lg border border-search-border bg-white px-4 py-3">
            <SearchIcon />
            <input
              aria-label="Search movies or series"
              className="outline-none min-w-0 flex-1 border-0 bg-transparent text-base placeholder:text-gray-400"
              placeholder="Search movies or series..."
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </header>
        <main className="mt-6">
          {error && <p className="my-4 text-center text-red-600">{error}</p>}
          {loading && (
            <p className="my-4 text-center text-gray-500">Loading...</p>
          )}
          {!loading && !error && query.trim() && movies.length === 0 && (
            <p className="my-4 text-center text-gray-500">
              No movies or series found.
            </p>
          )}
          {!loading && !error && movies.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
              {movies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
