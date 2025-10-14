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
export async function gettopRated() {
  try {
    const response = await axios.get(endpoints.topRated);
    console.error(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getNowPlating() {
  try {
    const response = await axios.get(endpoints.nowPlaying);
    console.error(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
export async function getUpComing() {
  try {
    const response = await axios.get(endpoints.upcoming);
    console.error(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
