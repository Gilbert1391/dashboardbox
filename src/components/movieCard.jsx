import React from "react";
import Fade from "react-reveal/Fade";

const MovieCard = props => {
  const { movies, showGenres } = props;

  //if (movies.length === 0) return <p>There are no movies in the database</p>;
  return (
    <div className="flex-grid">
      {movies.map(movie => (
        <Fade key={movie.id}>
          <div className="card" key={movie.id}>
            <div className="card__inner-wrapper">
              <img
                className="card__img"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="card__rating">
                <i className="card__icon fa fa-star" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="card__title">{movie.title}</p>
              <p className="card__genre">{showGenres(movie)}</p>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default MovieCard;
