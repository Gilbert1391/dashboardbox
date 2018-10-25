import React, { Component } from "react";
import { allMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import http from "../services/httpService";
import SideBar from "./sideBar";
import Header from "./header";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 20,
    currentPage: 1,
    selectedGenre: null
  };

  async componentDidMount() {
    const dataArr = await Promise.all(
      allMovies.map(async movie => await http.get(movie))
    );

    const movies = [].concat.apply(
      [],
      dataArr.map(movie => movie.data.results)
    );

    const genres = [{ name: "All genres" }, ...getGenres()];

    this.setState({ movies, genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleGenres = movie => {
    if (movie.genre_ids[0] === 12) return "Adventure";
    else if (movie.genre_ids[0] === 27) return "Horror";
    else if (movie.genre_ids[0] === 28) return "Action";
  };

  render() {
    //const { length } = this.state.movies;
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre.id
        ? allMovies.filter(m => m.genre_ids[0] === selectedGenre.id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    // if (count === 0) return <p>There are no movies in the database</p>;

    return (
      <div className="container">
        <Header />
        <div className="flex-container">
          <SideBar
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          <div className="content-flex">
            <div className="flex-grid">
              {movies.map(movie => (
                <div className="card" key={movie.id}>
                  <div className="card__inner-wrapper">
                    <img
                      className="card__img"
                      src={`https://image.tmdb.org/t/p/w300${
                        movie.poster_path
                      }`}
                      alt={movie.title}
                    />
                    <div className="card__rating">
                      <i className="card__icon fa fa-star" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <p className="card__title">{movie.title}</p>
                    <p className="card__genre">{this.handleGenres(movie)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              numberOfItems={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
