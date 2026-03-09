import axios from "axios";

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      "https://www.omdbapi.com/?i=tt3896198&apikey=95100530"
    );
    console.log("Api response", response);
  } catch (error) {
    console.error("Error fetching movies", error);
  }
};

export default fetchMovies;
