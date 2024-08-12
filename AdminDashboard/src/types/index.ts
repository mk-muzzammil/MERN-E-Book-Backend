export interface RegUser {
  name: string;
  email: string;
  password: string;
}
export interface logUser {
  email: string;
  password: string;
}
export interface ZustandStoretype {
  token: string;
  setToken: (data: string) => void;
}
export interface ZuStandGenreStoretype {
  selectedGenre: string;
  setSelectedGenre: (data: string) => void;
}
export interface Author {
  _id: string;
  name: string;
}
export interface Book {
  _id: string;
  title: string;
  genre: string;
  description: string;
  author: Author;
  coverImage: string;
  pdffile: string;
  createdAt: string;
}
