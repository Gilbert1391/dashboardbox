import React, { Component } from "react";
import { key } from "../services/movieService";
import { Fade } from "react-reveal";
import http from "../services/httpService";
import StarRatingComponent from "react-star-rating-component";

const apiUrl = "https://api.themoviedb.org/3/movie/";

class Dashboard extends Component {
  state = {
    movie: {},
    genres: [],
    cast: [],
    fixed_rating: null
  };

  async componentDidMount() {
    const queryString = `${apiUrl}${
      this.props.match.params.id
    }?api_key=${key}&append_to_response=credits`;

    const { data: movie } = await http.get(queryString);
    const genres = movie.genres;
    const cast = movie.credits.cast;
    const fixed_rating = movie.vote_average.toFixed(1);

    this.setState({ movie, genres, cast, fixed_rating });
  }

  render() {
    const { movie, genres, cast, fixed_rating } = this.state;
    const newCast = cast.slice(0, 5);
    console.log(newCast);

    const bgImg = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
        movie.backdrop_path
      })`
    };

    return (
      <React.Fragment>
        <div style={bgImg} className="dashboard-bg" />
        <div className="dashboard-bg__layer" />
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
                  {newCast.map(el => (
                    <a
                      key={el.cast_id}
                      href={`https://www.themoviedb.org/person/${el.id}`}
                      target="_blank"
                      className="cast__item"
                    >
                      <figure className="cast__img-wrapper">
                        <img
                          src={`https://image.tmdb.org/t/p/w185${
                            el.profile_path
                          }`}
                          alt=""
                          className="cast__img"
                        />
                        <figcaption className="cast__caption">
                          {el.name}
                        </figcaption>
                      </figure>
                    </a>
                  ))}
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
