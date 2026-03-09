import React, { useState } from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import moviesApi from "apis/movies";

import MovieDetailsModal from "./MovieDetailsModal";

const MovieList = ({ movies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleOpenModal = async movie => {
    setDetailsLoading(true);
    setIsModalOpen(true);
    try {
      const { data } = await moviesApi.getMovieDetails({
        imdbID: movie.imdbID,
      });
      setSelectedMovie(data);
      console.log("selectedMovie", data);
    } catch (err) {
      console.error("Error fetching movie details", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
        {movies.map(movie => (
          <li
            className="flex flex-col items-start rounded-lg bg-white p-5 shadow"
            key={movie.imdbID}
          >
            <img
              alt={movie.Title}
              className="h-auto w-full"
              src={movie.Poster}
            />
            <Typography className="mt-3" style="h4" weight="semibold">
              {movie.Title}
            </Typography>
            <Typography
              className="mt-2 text-sm capitalize text-gray-600"
              style="body2"
            >
              {movie.Type} • {movie.Year}
            </Typography>
            <Button
              fullWidth
              className="mt-3"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenModal(movie);
              }}
            >
              View Details
            </Button>
          </li>
        ))}
      </ul>
      <MovieDetailsModal
        detailsLoading={detailsLoading}
        isOpen={isModalOpen}
        selectedMovie={selectedMovie}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MovieList;
