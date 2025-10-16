export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const endpoints = {
  popular: `${BASE_URL}/movie/popular?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`,
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`,
  genres: `${BASE_URL}/genre/movie/list?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`,
  discover: `${BASE_URL}/discover/movie?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`,
};
