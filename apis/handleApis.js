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
    console.error(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function gettopRated(page) {
  try {
    const response = await axios.get(`${endpoints.topRated}&page=${page}`);
    console.error(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getNowPlaying(page) {
  try {
    const response = await axios.get(`${endpoints.nowPlaying}&page=${page}`);
    console.error(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getUpComing(page) {
  try {
    const response = await axios.get(`${endpoints.upcoming}&page=${page}`);
    console.error(response.data.results);
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
    console.error(response.data);
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
    console.error(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
