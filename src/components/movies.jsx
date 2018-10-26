import React, { Component } from "react";
import { allMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import http from "../services/httpService";
import MovieCard from "./movieCard";
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
    selectedGenre: null,
    searchQuery: ""
  };

  async componentDidMount() {
    const dataArr = await Promise.all(
      allMovies.map(async movie => await http.get(movie))
    );

    const movies = [].concat.apply(
      [],
      dataArr.map(movie => movie.data.results)
    );

    const genres = [{ id: "", name: "All genres" }, ...getGenres()];

    this.setState({ movies, genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleGenres = movie => {
    return getGenres().map(m => (m.id === movie.genre_ids[0] ? m.name : null));
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery
    } = this.state;

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
        <Header value={searchQuery} onSearch={this.handleSearch} />
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
