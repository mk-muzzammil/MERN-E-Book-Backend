export interface Book {
  _id: string;
  title: string | "no title";
  genre: string | "no genre";
  description: string | "no descr";
  coverImage: string | "no cover";
  pdfFile: string | "no file";
  author: Author | "no author";
}
export interface Author {
  name: string;
  _id: string;
}
