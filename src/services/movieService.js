export const popularMoviesData = [];
export const topRatedMovies = [];
export const nowPlayingMovies = [];

let popularQuery =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=68f7e49d39fd0c0a1dd9bd094d9a8c75&page=";

let topRatedQuery =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=68f7e49d39fd0c0a1dd9bd094d9a8c75&language=en-US&page=";

let theatersQuery =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=68f7e49d39fd0c0a1dd9bd094d9a8c75&language=en-US&page=";

function pushQuery(arr, str) {
  for (let i = 1; i < 11; i++) {
    arr.push(str + i);
  }
}

pushQuery(popularMoviesData, popularQuery);
pushQuery(topRatedMovies, topRatedQuery);
pushQuery(nowPlayingMovies, theatersQuery);
