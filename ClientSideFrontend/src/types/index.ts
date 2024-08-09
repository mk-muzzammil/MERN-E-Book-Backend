export interface Book {
  _id: string;
  title: string;
  genre: string;
  description: string;
  coverImage: string;
  pdfFile: string;
  author: Author;
}
export interface Author {
  name: string;
}
