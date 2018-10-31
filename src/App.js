import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  popularMovies,
  topRatedMovies,
  theaterMovies
} from "./services/movieService";
import { getGenres } from "./services/genreService";
import http from "./services/httpService";
import Movies from "./components/movies";
import Dashboard from "./components/dashboard";
import notFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    moviesData: {
      popularMovies: [],
      topRatedMovies: [],
      theaterMovies: []
    },
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
      popularMovies.map(async movie => await http.get(movie))
    );

    const popular = [].concat.apply([], data.map(movie => movie.data.results));

    const data2 = await Promise.all(
      topRatedMovies.map(async movie => await http.get(movie))
    );

    const topRated = [].concat.apply(
      [],
      data2.map(movie => movie.data.results)
    );

    const data3 = await Promise.all(
      theaterMovies.map(async movie => await http.get(movie))
    );

    const theater = [].concat.apply([], data3.map(movie => movie.data.results));

    let moviesData = { ...this.state.moviesData };
    moviesData.popularMovies = popular;
    moviesData.topRatedMovies = topRated;
    moviesData.theaterMovies = theater;

    const genres = [{ id: "", name: "All genres" }, ...getGenres()];

    this.setState({ moviesData, genres });
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
      moviesData,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortValue,
      loading,
      bounce
    } = this.state;

    const { popularMovies, topRatedMovies, theaterMovies } = moviesData;

    let allMovies = popularMovies;

    if (sortValue === "Top Rated") {
      allMovies = topRatedMovies;
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

    return (
      <React.Fragment>
        <ToastContainer />
        <React.Fragment>
          <Switch>
            <Route path="/movie/:id" component={Dashboard} />
            <Route path="/not-found" component={notFound} />
            <Route
              path="/"
              exact
              render={props => (
                <Movies
                  filtered={filtered}
                  genres={genres}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  searchQuery={searchQuery}
                  sortValue={sortValue}
                  selectedGenre={selectedGenre}
                  loading={loading}
                  bounce={bounce}
                  onPageChange={this.handlePageChange}
                  onGenreSelect={this.handleGenreSelect}
                  onSearch={this.handleSearch}
                  onGenres={this.handleGenres}
                  onSortValue={this.handleSortValue}
                  {...props}
                />
              )}
            />
            <Redirect to="/not-found" />
          </Switch>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
