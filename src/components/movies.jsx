import React, { Component } from "react";
import {
  popularMoviesData,
  topRatedMovies,
  nowPlayingMovies
} from "../services/movieService";
import { getGenres } from "../services/genreService";
import http from "../services/httpService";
import MovieCard from "./movieCard";
import SideBar from "./sideBar";
import Header from "./header";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    popularMovies: [],
    topMovies: [],
    theaterMovies: [],
    genres: [],
    pageSize: 20,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    inputValue: "Popularity"
  };

  async componentDidMount() {
    const data = await Promise.all(
      popularMoviesData.map(async movie => await http.get(movie))
    );

    const popularMovies = [].concat.apply(
      [],
      data.map(movie => movie.data.results)
    );

    const data2 = await Promise.all(
      topRatedMovies.map(async movie => await http.get(movie))
    );

    const topMovies = [].concat.apply(
      [],
      data2.map(movie => movie.data.results)
    );

    const data3 = await Promise.all(
      nowPlayingMovies.map(async movie => await http.get(movie))
    );

    const theaterMovies = [].concat.apply(
      [],
      data3.map(movie => movie.data.results)
    );

    const genres = [{ id: "", name: "All genres" }, ...getGenres()];

    this.setState({ popularMovies, topMovies, theaterMovies, genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleGenres = movie => {
    return getGenres().map(m => (m.id === movie.genre_ids[0] ? m.name : null));
  };

  handleInputValue = value => {
    this.setState({ inputValue: value, currentPage: 1 });
  };

  render() {
    const {
      popularMovies,
      topMovies,
      theaterMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      inputValue
    } = this.state;

    let allMovies = popularMovies;

    if (inputValue === "Top Rated") {
      allMovies = topMovies;
    } else if (inputValue === "Now Playing") {
      allMovies = theaterMovies;
    }

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre.id) {
      filtered = allMovies.filter(m => m.genre_ids[0] === selectedGenre.id);
    }

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="container">
        <Header
          value={searchQuery}
          onSearch={this.handleSearch}
          onValueSelect={this.handleInputValue}
          inputValue={this.state.inputValue}
        />
        <div className="flex-container">
          <SideBar
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          <div className="content-flex">
            <MovieCard movies={movies} showGenres={this.handleGenres} />
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
