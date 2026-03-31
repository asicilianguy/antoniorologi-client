import axios from "axios";

const API = typeof window === "undefined"
  ? (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001")
  : "";

const http = axios.create({ baseURL: API, withCredentials: false });

export const clocksApi = {
  list: ()        => http.get("/api/clocks"),
  getById: (id: string) => http.get(`/api/clocks/${id}`),
};
