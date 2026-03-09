import React, { useCallback, useEffect, useState } from "react";

import { Input, Spinner } from "@bigbinary/neetoui";
import moviesApi from "apis/movies";
import { useDebounce } from "hooks/useDebounce";
import { isEmpty } from "ramda";

import MovieList from "./MovieList";

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
        <div className="flex h-80 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {isEmpty(movies) ? (
            <p className="text-center text-gray-500">No movies found</p>
          ) : (
            <MovieList movies={movies} />
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
