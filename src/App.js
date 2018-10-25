import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Movies />
      </React.Fragment>
    );
  }
}

export default App;
