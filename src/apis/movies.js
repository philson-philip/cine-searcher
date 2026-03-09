import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const getMovies = ({ searchTerm }) =>
  axios.get(
    `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${searchTerm}`
  );

const moviesApi = {
  getMovies,
};

export default moviesApi;
