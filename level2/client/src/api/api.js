import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // replace with your backend URL
  withCredentials: true, // important if using httpOnly cookies
});

// Attach token if stored in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

