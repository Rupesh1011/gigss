import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", BACKEND_URL);

const newRequest = axios.create({
  baseURL: `${BACKEND_URL}/api/`,
  withCredentials: true,
});

export default newRequest;
