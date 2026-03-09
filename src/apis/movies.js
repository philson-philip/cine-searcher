import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com";

const getMovies = ({ searchTerm }) =>
  axios.get(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
  );

const getMovieDetails = ({ imdbID }) =>
  axios.get(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`);

const moviesApi = {
  getMovies,
  getMovieDetails,
};

export default moviesApi;
