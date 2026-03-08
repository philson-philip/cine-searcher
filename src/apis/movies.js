const OMDB_BASE_URL = "https://www.omdbapi.com";

const getApiKey = () => {
  const key = process.env.REACT_APP_OMDB_API_KEY;
  if (!key || key.trim() === "") {
    throw new Error(
      "Missing API key. Add REACT_APP_OMDB_API_KEY to your .env file and restart the dev server (npm start). Get a free key at https://www.omdbapi.com/apikey.aspx"
    );
  }

  return key.trim();
};

export const searchMovies = async query => {
  if (!query?.trim()) return { Search: [], totalResults: "0" };

  const params = new URLSearchParams({
    apikey: getApiKey(),
    s: query.trim(),
    type: "movie,series",
  });

  const response = await fetch(`${OMDB_BASE_URL}/?${params}`);
  const data = await response.json();

  if (data.Error && /invalid api key/i.test(data.Error)) {
    throw new Error(
      "Invalid API key. Get a free key at https://www.omdbapi.com/apikey.aspx and set REACT_APP_OMDB_API_KEY in .env, then restart the app."
    );
  }

  if (!response.ok) {
    throw new Error(data.Error || "Failed to fetch movies");
  }

  return {
    Search: data.Search || [],
    totalResults: data.totalResults || "0",
  };
};
