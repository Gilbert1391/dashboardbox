export const allMovies = [];

let queryString =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=68f7e49d39fd0c0a1dd9bd094d9a8c75&page=";

for (let i = 1; i < 11; i++) {
  allMovies.push(queryString + i);
}
