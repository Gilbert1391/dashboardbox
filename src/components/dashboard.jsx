import React, { Component } from "react";
import { key } from "../services/movieService";
import { Fade } from "react-reveal";
import http from "../services/httpService";
import StarRatingComponent from "react-star-rating-component";

const url = "https://api.themoviedb.org/3/movie/";

class Dashboard extends Component {
  state = {
    movie: [],
    genres: []
  };

  async componentDidMount() {
    const queryString = `${url}${this.props.match.params.id}?api_key=${key}`;

    const { data: movie } = await http.get(queryString);
    const genres = movie.genres;

    this.setState({ movie, genres });
  }

  render() {
    const { movie, genres } = this.state;

    const bgImg = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
        movie.backdrop_path
      })`
    };
    return (
      <React.Fragment>
        <div style={bgImg} className="dashboard-bg" />
        <div className="dashboard">
          <Fade>
            <div className="dashboard__img-wrapper">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="dashboard__img"
              />
            </div>
            <div className="dashboard__content">
              <div className="dashboard__group">
                <h1 className="dashboard__title">{movie.title}</h1>
                <div className="dashboard__genres">
                  {genres.map(m => (
                    <span key={m.id}>{m.name} / </span>
                  ))}
                  <span>{movie.release_date} / </span>
                  <span>{`${movie.runtime}min`}</span>
                </div>
                <div className="dashboard__rating">
                  <StarRatingComponent
                    name="rate"
                    value={movie.vote_average > 9 ? 10 : movie.vote_average / 2}
                  />
                  <span>{movie.vote_average} User Score</span>
                </div>
              </div>
              <div className="dasboard__group">
                <h3 className="dashboard__terciary-heading">Overview</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Fade>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
