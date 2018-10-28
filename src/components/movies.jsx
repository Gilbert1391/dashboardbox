import React from "react";
import MovieCard from "./movieCard";
import SideBar from "./sideBar";
import Header from "./header";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Movies = props => {
  const {
    filtered,
    genres,
    pageSize,
    currentPage,
    sortValue,
    loading,
    bounce,
    selectedGenre,
    searchQuery,
    onPageChange,
    onGenreSelect,
    onSearch,
    onGenres,
    onSortValue
  } = props;

  const movies = paginate(filtered, currentPage, pageSize);

  return (
    <React.Fragment>
      <Header
        value={searchQuery}
        onSearch={onSearch}
        onValueSelect={onSortValue}
        sortValue={sortValue}
      />
      <div className="flex-container">
        <SideBar
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={onGenreSelect}
        />
        <div className="content-flex">
          <MovieCard
            movies={movies}
            showGenres={onGenres}
            loading={loading}
            bounceEffect={bounce}
          />
          <Pagination
            numberOfItems={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Movies;
