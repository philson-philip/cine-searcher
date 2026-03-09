import React, { useCallback, useEffect, useState } from "react";

import { Input, Spinner } from "@bigbinary/neetoui";
import moviesApi from "apis/movies";
import { useDebounce } from "hooks/useDebounce";

const DEBOUNCE_DELAY = 300;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await moviesApi.getMovies({
        searchTerm: debouncedSearchTerm,
      });
      setMovies(response.data.Search ?? []);
      console.log("Movies", response.data);
    } catch (error) {
      console.error("Error fetching movies", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      <header className="mb-8">
        <Input
          placeholder="Search movies or series..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </header>
      {loading ? (
        <div className="h-100 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {movies.length ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
              {movies.map(movie => {
                const { imdbID, Title, Poster, Year } = movie;

                return (
                  <li
                    className="rounded-lg bg-white p-4 shadow-md"
                    key={imdbID}
                  >
                    <img alt={Title} className="h-auto w-full" src={Poster} />
                    <h3 className="text-lg font-bold">{Title}</h3>
                    <p className="text-sm text-gray-500">{Year}</p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No movies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
