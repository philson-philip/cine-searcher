import React, { useState } from "react";

import { Button, Modal, Typography } from "@bigbinary/neetoui";

const MovieList = ({ movies }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = movie => {
    setSelectedMovie(movie);
    console.log("selectedMovie", selectedMovie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
        {movies.map(movie => {
          const { imdbID, Title, Poster, Year, Type } = movie;

          return (
            <li
              className="flex flex-col items-start rounded-lg bg-white p-5 shadow"
              key={imdbID}
            >
              <img alt={Title} className="h-auto w-full" src={Poster} />
              <Typography className="mt-3" style="h4" weight="semibold">
                {Title}
              </Typography>
              <Typography
                className="mt-2 text-sm capitalize text-gray-600"
                style="body2"
              >
                {Type} • {Year}
              </Typography>
              <Button
                fullWidth
                className="mt-3"
                onClick={e => {
                  e.preventDefault();
                  handleOpenModal(movie);
                }}
              >
                View Details
              </Button>
            </li>
          );
        })}
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>
          <Typography style="h2" weight="semibold">
            {selectedMovie?.Title ?? "Movie Title"}
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography
            className="text-gray-600"
            lineHeight="normal"
            style="body1"
          >
            {selectedMovie?.Plot ?? "No plot available."}
          </Typography>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieList;
