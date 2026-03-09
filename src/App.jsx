// import { useMovieSearch } from "hooks";

import { useEffect } from "react";

import fetchMovies from "apis/movies";

const App = () => {
  // const { query, setQuery, movies, loading, error } = useMovieSearch();
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-page-bg px-4 pb-12 pt-8">
      <div className="mx-auto max-w-[1200px]">
        {/* <header className="mb-8">
          <div className="mx-auto flex max-w-[480px] items-center gap-3 rounded-lg border border-search-border bg-white px-4 py-3">
            <input
              aria-label="Search movies or series"
              className="outline-none min-w-0 flex-1 border-0 bg-transparent text-base placeholder:text-gray-400"
              placeholder="Search movies or series..."
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </header> */}
        <main className="mt-6">
          <h1>Movies</h1>
        </main>
      </div>
    </div>
  );
};

export default App;
