import { useTokenStore } from "@/zustandStore";
import axios from "axios";
//create a new axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//and then set a function that will be passed to our mutateFn

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});
const loginApi = async (data: { email: string; password: string }) =>
  await api.post("/users/login", data);

const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
}) => await api.post("/users/register", data);

const fetchBookList = async (page: number = 1, limit: number = 5) =>
  await api.get(`/books?page=${page}&limit=${limit}`);

const createBookApi = async (data: FormData) => {
  return await api.post("books/create-book", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const fetchGenreList = async () => await api.get("/books/genres");
const fetchBooksByGenre = async (genre: string) =>
  await api.get(`/books/genres/${genre}`);
const deleteBookApi = async (_id: string) => {
  return await api.delete(`/books/${_id}`);
};
const getSingleBook = async (_id: string) => {
  return await api.get(`/books/${_id}`);
};
const EditBookApi = async (bookData: { _id: string; formData: FormData }) => {
  return await api.patch(`/books/${bookData._id}`, bookData.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export {
  loginApi,
  registerApi,
  fetchBookList,
  createBookApi,
  fetchGenreList,
  fetchBooksByGenre,
  deleteBookApi,
  EditBookApi,
  getSingleBook,
};
