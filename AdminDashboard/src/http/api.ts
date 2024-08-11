import axios from "axios";
//create a new axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//and then set a function that will be passed to our mutateFn

const loginApi = async (data: { email: string; password: string }) =>
  await api.post("/users/login", data);

const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
}) => await api.post("/users/register", data);

const fetchBookList = async (page: number = 1, limit: number = 5) =>
  await api.get(`/books?page=${page}&limit=${limit}`);
export { loginApi, registerApi, fetchBookList };
