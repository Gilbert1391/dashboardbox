import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { moviesData, queries, getData } from "./services/movieService";
import { getGenres } from "./services/genreService";
import http from "./services/httpService";
import Movies from "./components/movies";
import Dashboard from "./components/dashboard";
import notFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

class App extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 20,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortValue: "Popularity",
    loading: true,
    bounce: true
  };

  async fetchData(sortMovies, query) {
    getData(sortMovies, query);

    const data = await Promise.all(
      moviesData[sortMovies].map(async movie => await http.get(movie))
    );

    let movies = [].concat.apply([], data.map(movie => movie.data.results));
    if (movies.length > 200) {
      movies = movies.slice(0, 200);
    }

    this.setState({ movies });
  }

  componentDidMount() {
    this.fetchData("popular_movies", queries.popular);
    const genres = [{ id: "", name: "All genres" }, ...getGenres()];
    this.setState({ genres });
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
    let sortMovies = "popular_movies",
      query = queries.popular;

    if (value === "Top Rated") {
      sortMovies = "top_movies";
      query = queries.top_rated;
    } else if (value === "Now Playing") {
      sortMovies = "theaters_movies";
      query = queries.theaters;
    }

    this.setState({ sortValue: value, currentPage: 1 });
    this.fetchData(sortMovies, query);
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
      movies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortValue,
      loading,
      bounce
    } = this.state;

    const allMovies = movies;

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
          <HashRouter>
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
          </HashRouter>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
