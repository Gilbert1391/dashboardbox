import React, { Component } from "react";
import { key } from "../services/movieService";
import http from "../services/httpService";

const url = "https://api.themoviedb.org/3/movie/";

class Dashboard extends Component {
  state = {
    movie: []
  };

  async componentDidMount() {
    const queryString = `${url}${this.props.match.params.id}?api_key=${key}`;

    const { data: movie } = await http.get(queryString);

    this.setState({ movie });
  }

  render() {
    return (
      <div>
        <h1>{this.state.movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`}
        />
      </div>
    );
  }
}

export default Dashboard;
