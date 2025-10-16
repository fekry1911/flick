import axios from "axios";
import { endpoints } from "../utils/Api_keys";

const BASE_URL_AUTH = "https://vcare.integration25.com/api";

export async function handleRegister(data) {
  try {
    const response = await axios.post(`${BASE_URL_AUTH}/auth/register`, data);
    console.log("✅ Register Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Register Error:", error.response?.data || error.message);
    throw error;
  }
}
export async function handleLogin(data) {
  try {
    const response = await axios.post(`${BASE_URL_AUTH}/auth/login`, data);
    console.log("✅ Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error;
  }
}
export async function getPopular() {
  try {
    const response = await axios.get(endpoints.popular);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function gettopRated(page) {
  try {
    const response = await axios.get(`${endpoints.topRated}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getNowPlaying(page) {
  try {
    const response = await axios.get(`${endpoints.nowPlaying}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getUpComing(page) {
  try {
    const response = await axios.get(`${endpoints.upcoming}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

export async function getMovieById(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`
    );
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getMovieActorsById(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f`
    );
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getMovieByName(name) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f&query=${name}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getGenres() {
  try {
    const response = await axios.get(endpoints.genres);
    return response.data.genres;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getMoviesGenres(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=898b4d5c1b1b33f5e6bf15c99c48d29f&with_genres=${id}`
    );

    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
