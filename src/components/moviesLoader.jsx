import React from "react";
import { ClipLoader } from "react-spinners";
import { Fade, Bounce } from "react-reveal";

const MoviesLoader = ({ movies, loading, bounceEffect }) => {
  if (movies.length === 0 && loading) {
    return (
      <div className="flex-center">
        <div className="sweet-loading">
          <ClipLoader
            sizeUnit={"px"}
            size={50}
            color={"#faca31"}
            loading={loading}
          />
        </div>
      </div>
    );
  } else if (movies.length === 0 && !loading) {
    return (
      <div className="flex-center">
        {bounceEffect ? (
          <Fade>
            <h2 style={{ color: "#faca31" }}>
              There are no movies in the data base.
            </h2>
          </Fade>
        ) : (
          <Bounce>
            <h2 style={{ color: "#faca31" }}>
              There are no movies in the data base.
            </h2>
          </Bounce>
        )}
      </div>
    );
  }
  return "";
};

export default MoviesLoader;
