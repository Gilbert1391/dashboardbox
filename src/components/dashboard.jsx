import React, { Component } from "react";
import { movieUrl, key } from "../services/movieService";
import { Fade } from "react-reveal";
import { ClipLoader } from "react-spinners";
import http from "../services/httpService";
import StarRatingComponent from "react-star-rating-component";

class Dashboard extends Component {
  state = {
    movie: {},
    trailer: {},
    genres: [],
    fixed_rating: null,
    loading: true
  };

  async componentDidMount() {
    const queryString = `${movieUrl}${
      this.props.match.params.id
    }?api_key=${key}`;

    const { data: movie } = await http.get(queryString);
    const genres = movie.genres;
    const fixed_rating = movie.vote_average.toFixed(1);

    const videoUrl = `${movieUrl}${movie.id}/videos?api_key=${key}`;
    const { data: videos } = await http.get(videoUrl);
    const trailer = videos.results[0];

    this.setState({ movie, trailer, genres, fixed_rating });
  }

  handleLoader() {
    setTimeout(() => this.setState({ loading: false }), 2000);
  }

  handleHomeBtn = () => {
    this.props.history.push("/");
  };

  render() {
    const { movie, trailer, genres, fixed_rating, loading } = this.state;

    const bgImg = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
        movie.backdrop_path
      })`
    };

    if (!movie.backdrop_path && loading) {
      return (
        <section className="dashboard">
          {this.handleLoader()}
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
        </section>
      );
    }

    return (
      <React.Fragment>
        <div style={bgImg} className="dashboard-bg" />
        <div className="dashboard-bg__layer" />
        <Fade>
          <React.Fragment>
            <section className="dashboard">
              <div className="dashboard__header-bar">
                <h1 className="dashboard__title">{movie.title}</h1>
                <div className="dashboard__rating">
                  <StarRatingComponent
                    name="rate"
                    value={movie.vote_average > 9 ? 10 : movie.vote_average / 2}
                    starColor={"#faca31"}
                    emptyStarColor={"#242126"}
                  />
                  <p className="dashboard__user-rating">{fixed_rating} </p>
                </div>
              </div>
              <div style={bgImg} className="dashboard__img">
                <div className="dashboard__img--layer" />
                {!movie.tagline ? (
                  ""
                ) : (
                  <h3 className="dashboard__tagline">{`"${movie.tagline}"`}</h3>
                )}
              </div>
              <div className="dashboard__body">
                <div className="dashboard__group">
                  <div>
                    {genres.map(m => (
                      <span key={m.id}>{m.name} / </span>
                    ))}
                    <span>{movie.release_date} / </span>
                    <span>{!movie.runtime ? "" : `${movie.runtime}min`}</span>
                  </div>
                  <a
                    href={`https://www.themoviedb.org/movie/${movie.id}/cast`}
                    className="dashboard__casting"
                    target="_blank"
                  >
                    Full Cast
                  </a>
                  <div className="dashboard__btn-group">
                    <a
                      onClick={this.handleHomeBtn}
                      className="dashboard__btn dashboard__btn--home"
                    >
                      <div className="dashboard__icon">
                        <i
                          style={{ marginRight: "0.7rem" }}
                          className="fa fa-long-arrow-left"
                        />
                        <i className="fa fa-home" />
                      </div>
                    </a>
                    {!trailer ? (
                      ""
                    ) : (
                      <a
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        className="dashboard__btn"
                      >
                        Watch Trailer
                        <div
                          style={{ marginLeft: "0.7rem" }}
                          className="dashboard__icon"
                        >
                          <i className="fa fa-caret-right" />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
                <p className="dashboard__overview">{movie.overview}</p>
              </div>
            </section>
          </React.Fragment>
        </Fade>
      </React.Fragment>
    );
  }
}

export default Dashboard;
