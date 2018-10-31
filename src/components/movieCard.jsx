import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Fade, Bounce } from "react-reveal";
import placeholderImg from "../img/placeholder-img.jpg";

const MovieCard = ({ movies, showGenres, loading, bounceEffect }) => {
  if (movies.length === 0 && loading) {
    return (
      <div className="flex-center">
        <div className="sweet-loading">
          <ClipLoader
            sizeUnit={"px"}
            size={50}
            color={"#faca31"}
            loading={loading}
          />
        </div>
      </div>
    );
  } else if (movies.length === 0 && !loading) {
    return (
      <div className="flex-center">
        {bounceEffect ? (
          <Fade>
            <h2>There are no movies in the data base.</h2>
          </Fade>
        ) : (
          <Bounce>
            <h2>There are no movies in the data base.</h2>
          </Bounce>
        )}
      </div>
    );
  }

  return (
    <section className="flex-grid">
      {movies.map(movie => (
        <Fade key={movie.id}>
          <div className="card" to={`movie/${movie.id}`}>
            <Link to={`/movie/${movie.id}`} className="card__inner-wrapper">
              <img
                className="card__img"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : placeholderImg
                }
                alt={movie.title}
              />
              <div className="card__rating">
                <i className="card__icon fa fa-star" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="card__title">{movie.title}</p>
              <p className="card__genre">{showGenres(movie)}</p>
            </Link>
          </div>
        </Fade>
      ))}
    </section>
  );
};

export default MovieCard;
