import { useState, useEffect } from "react";

import { searchMovies } from "apis/movies";
import { useDebounce } from "hooks/useDebounce";

const DEBOUNCE_DELAY_MS = 300;
const DEFAULT_SEARCH_TERM = "the";

export const useMovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY_MS);
  const searchTerm = debouncedQuery.trim() || DEFAULT_SEARCH_TERM;

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const { Search } = await searchMovies(searchTerm);
        if (!cancelled) setMovies(Search || []);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setMovies([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  return { query, setQuery, movies, loading, error };
};
