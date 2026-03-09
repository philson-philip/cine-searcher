import React from "react";

import { Modal, Spinner, Tag, Typography } from "@bigbinary/neetoui";

const MovieDetailsModal = ({
  isOpen,
  onClose,
  selectedMovie,
  detailsLoading,
}) => (
  <Modal isOpen={isOpen} size="large" onClose={onClose}>
    <Modal.Header>
      <div className="flex flex-col items-start gap-2">
        <Typography style="h2" weight="semibold">
          {selectedMovie?.Title ?? "Movie details"}
        </Typography>
        {selectedMovie?.Genre && (
          <div className="flex flex-wrap gap-2">
            {selectedMovie.Genre.split(",").map(genre => (
              <Tag key={genre.trim()} type="solid">
                {genre.trim()}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </Modal.Header>
    <Modal.Body className="space-y-2">
      {detailsLoading && (
        <div className="flex justify-center py-6">
          <Spinner />
        </div>
      )}
      {!detailsLoading && selectedMovie && (
        <div className="flex flex-row gap-6">
          <div className="w-1/3">
            <img
              alt={selectedMovie.Title}
              className="h-full w-full object-cover"
              src={selectedMovie.Poster}
            />
          </div>
          <div className="w-2/3 space-y-3">
            {selectedMovie.Plot && (
              <Typography
                className="text-gray-600"
                lineHeight="normal"
                style="body1"
              >
                {selectedMovie.Plot}
              </Typography>
            )}
            {selectedMovie.Director && selectedMovie.Director !== "N/A" && (
              <Typography style="body2">
                <span className="font-semibold">Director:</span>{" "}
                {selectedMovie.Director}
              </Typography>
            )}
            {selectedMovie.Actors && selectedMovie.Actors !== "N/A" && (
              <Typography style="body2">
                <span className="font-semibold">Cast:</span>{" "}
                {selectedMovie.Actors}
              </Typography>
            )}
            {selectedMovie.Genre && selectedMovie.Genre !== "N/A" && (
              <Typography style="body2">
                <span className="font-semibold">Genre:</span>{" "}
                {selectedMovie.Genre}
              </Typography>
            )}
            {selectedMovie.Runtime && selectedMovie.Runtime !== "N/A" && (
              <Typography style="body2">
                <span className="font-semibold">Runtime:</span>{" "}
                {selectedMovie.Runtime}
              </Typography>
            )}
          </div>
        </div>
      )}
    </Modal.Body>
  </Modal>
);

export default MovieDetailsModal;
