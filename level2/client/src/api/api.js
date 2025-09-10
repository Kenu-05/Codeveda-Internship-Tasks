import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
  withCredentials: true,                // to send cookies
});

// Auth APIs
export const signup = (data) => API.post("/user/signup", data);
export const login = (data) => API.post("/user/login", data);
export const logout = () => API.post("/user/logout");
export const getMe = () => API.get("/user/me");

// Item APIs
export const getItems = () => API.get("/items");
export const createItem = (data) => API.post("/items", data);
export const updateItem = (id, data) => API.put(`/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export default API;
