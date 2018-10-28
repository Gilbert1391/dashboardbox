export const popularMovies = [];
export const topRatedMovies = [];
export const theaterMovies = [];

const url = "https://api.themoviedb.org/3/";
const key = "68f7e49d39fd0c0a1dd9bd094d9a8c75";

let popular = `${url}discover/movie?sort_by=popularity.desc&api_key=${key}&page=`;
let topRated = `${url}movie/top_rated?api_key=${key}&language=en-US&page=`;
let theaters = `${url}movie/now_playing?api_key=${key}&language=en-US&page=`;

function pushQuery(arr, str) {
  for (let i = 1; i < 11; i++) {
    arr.push(str + i);
  }
}

pushQuery(popularMovies, popular);
pushQuery(topRatedMovies, topRated);
pushQuery(theaterMovies, theaters);
