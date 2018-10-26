import React, { Component } from "react";
import { css } from "react-emotion";
import { ClipLoader } from "react-spinners";
import Fade from "react-reveal/Fade";
import placeholder from "../img/placeholder-img.jpg";

class MovieCard extends Component {
  state = {
    loading: true
  };

  render() {
    if (this.props.movies.length === 0)
      return (
        <div className="flex-center">
          <div className="sweet-loading">
            <ClipLoader
              sizeUnit={"px"}
              size={50}
              color={"#ec3866"}
              loading={this.state.loading}
            />
          </div>
        </div>
      );

    return (
      <div className="flex-grid">
        {this.props.movies.map(movie => (
          <Fade key={movie.id}>
            <div className="card" key={movie.id}>
              <div className="card__inner-wrapper">
                <img
                  className="card__img"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : placeholder
                  }
                  alt={movie.title}
                />
                <div className="card__rating">
                  <i className="card__icon fa fa-star" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <p className="card__title">{movie.title}</p>
                <p className="card__genre">{this.props.showGenres(movie)}</p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    );
  }
}

export default MovieCard;
