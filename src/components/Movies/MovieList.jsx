import React from "react";

const MovieList = ({ movies }) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
    {movies.map(movie => {
      const { imdbID, Title, Poster, Year } = movie;

      return (
        <li className="rounded-lg bg-white p-4 shadow-md" key={imdbID}>
          <img alt={Title} className="h-auto w-full" src={Poster} />
          <h3 className="text-lg font-bold">{Title}</h3>
          <p className="text-sm text-gray-500">{Year}</p>
        </li>
      );
    })}
  </ul>
);

export default MovieList;
