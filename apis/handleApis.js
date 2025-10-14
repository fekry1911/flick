import axios from "axios";

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
