import React from "react";
import MoviesLoader from "./moviesLoader";
import MovieCard from "./movieCard";
import SideBar from "./sideBar";
import Header from "./header";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PhoneNav from "./phoneNav";
import PhoneFooter from "./phoneFooter";

const Movies = ({
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
}) => {
  const movies = paginate(filtered, currentPage, pageSize);

  return (
    <div className="container">
      <div className="phone-fixed-header">
        <Header
          value={searchQuery}
          onSearch={onSearch}
          onValueSelect={onSortValue}
          sortValue={sortValue}
        />
        <PhoneNav
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={onGenreSelect}
        />
      </div>
      <main className="flex-container">
        <SideBar
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={onGenreSelect}
        />
        <div className="content-flex">
          <MoviesLoader
            movies={movies}
            loading={loading}
            bounceEffect={bounce}
          />
          <MovieCard movies={movies} showGenres={onGenres} />
          <Pagination
            numberOfItems={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </main>
      <PhoneFooter />
    </div>
  );
};

export default Movies;
