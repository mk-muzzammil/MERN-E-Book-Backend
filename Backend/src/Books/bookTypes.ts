import User from "../user/userModel";

export interface Book {
  _id: string;
  title: string;
  author: User;
  genre: string;
  pdfFile: string;
  coverImage: string;
  description: string;
}
