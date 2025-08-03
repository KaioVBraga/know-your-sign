import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (request: any) => {
  if (!request.headers) {
    request.headers = {};
  }

  const token = localStorage.getItem("JWT_TOKEN");

  request.headers["Authorization"] = "Bearer " + token;

  return request;
});
