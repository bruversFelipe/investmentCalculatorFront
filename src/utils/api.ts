import axios from "axios";
import { getStorage } from "./storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/v1"
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getStorage("auth_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
