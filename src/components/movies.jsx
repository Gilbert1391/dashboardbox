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
    sortValue: "Popularity",
    loading: true,
    bounce: true
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
    this.handleLoader(genre);
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleGenres = movie => {
    return getGenres().map(m => (m.id === movie.genre_ids[0] ? m.name : null));
  };

  handleSortValue = value => {
    this.setState({ sortValue: value, currentPage: 1 });
  };

  handleLoader = item => {
    let { selectedGenre, loading, bounce } = this.state;
    if (item === selectedGenre) {
      loading = false;
      bounce = false;
    } else {
      loading = true;
      bounce = true;
    }
    setTimeout(() => this.setState({ loading: false }), 1000);
    this.setState({ loading, bounce });
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
      sortValue,
      loading,
      bounce
    } = this.state;

    let allMovies = popularMovies;

    if (sortValue === "Top Rated") {
      allMovies = topMovies;
    } else if (sortValue === "Now Playing") {
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
      <React.Fragment>
        <Header
          value={searchQuery}
          onSearch={this.handleSearch}
          onValueSelect={this.handleSortValue}
          sortValue={sortValue}
        />
        <div className="flex-container">
          <SideBar
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          <div className="content-flex">
            <MovieCard
              movies={movies}
              showGenres={this.handleGenres}
              loading={loading}
              bounceEffect={bounce}
            />
            <Pagination
              numberOfItems={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
