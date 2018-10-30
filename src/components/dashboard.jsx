import React, { Component } from "react";
import { key } from "../services/movieService";
import { Fade } from "react-reveal";
import { ClipLoader } from "react-spinners";
import http from "../services/httpService";
import placeholderImg from "../img/placeholder-img.jpg";
import profilePlaceholder from "../img/profile_placeholder.jpg";
import profileImg from "../img/profile-pic.jpeg";
import StarRatingComponent from "react-star-rating-component";

const apiUrl = "https://api.themoviedb.org/3/movie/";

class Dashboard extends Component {
  state = {
    movie: {},
    genres: [],
    allCast: [],
    fixed_rating: null,
    loading: true
  };

  async componentDidMount() {
    const queryString = `${apiUrl}${
      this.props.match.params.id
    }?api_key=${key}&append_to_response=credits`;

    const { data: movie } = await http.get(queryString);
    const genres = movie.genres;
    const allCast = movie.credits.cast;
    const fixed_rating = movie.vote_average.toFixed(1);

    this.setState({ movie, genres, allCast, fixed_rating });
  }

  handleLoader() {
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {
    const { movie, genres, allCast, fixed_rating, loading } = this.state;
    const cast = allCast.slice(0, 5);
    const viewCast = allCast.length - cast.length;

    const bgImg = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
        movie.backdrop_path
      })`
    };

    if (!movie.poster_path && loading) {
      return (
        <div className="dashboard">
          {this.handleLoader()}
          <div className="flex-center">
            <div className="sweet-loading">
              <ClipLoader
                sizeUnit={"px"}
                size={50}
                color={"#333"}
                loading={loading}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div style={bgImg} className="dashboard-bg" />
        <div className="dashboard-bg__layer" />
        <div className="dashboard">
          <Fade>
            <div className="dashboard__img-wrapper">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : placeholderImg
                }
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
                    startColor={"rgb(255, 188, 38)"}
                    emptyStarColor={"#f4f2f2"}
                  />
                  <p className="dashboard__user-rating">{fixed_rating} </p>
                </div>
              </div>
              <div className="dashboard__group">
                <h3 className="dashboard__terciary-heading">Overview</h3>
                <p>{movie.overview}</p>
              </div>
              <div className="dashboard__group">
                <h3 className="dashboard__terciary-heading">The cast</h3>
                <div className="cast">
                  {cast.map(el => (
                    <a
                      key={el.cast_id}
                      href={`https://www.themoviedb.org/person/${el.id}`}
                      target="_blank"
                      className="cast__item"
                    >
                      <figure className="cast__img-wrapper">
                        <img
                          src={
                            el.profile_path
                              ? `https://image.tmdb.org/t/p/w185${
                                  el.profile_path
                                }`
                              : profilePlaceholder
                          }
                          alt={el.name}
                          className="cast__img"
                        />
                        <figcaption className="cast__caption">
                          {el.name}
                        </figcaption>
                      </figure>
                    </a>
                  ))}
                  <a
                    href={`https://www.themoviedb.org/movie/${movie.id}/cast`}
                    className="cast__item"
                    target="_blank"
                  >
                    <figure className="cast__img-wrapper">
                      <img
                        src={profileImg}
                        alt=""
                        className="cast__img cast__img--last"
                      />
                      <figcaption className="cast__caption cast__caption--last">
                        {`+${viewCast}`}
                      </figcaption>
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
