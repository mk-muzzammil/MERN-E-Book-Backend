import React from "react";
import { Book } from "@/types/index";
import BookCard from "./BookCard";

const bookList = ({ bookList }: { bookList: Book[] }) => {
  return (
    <div className="grid grid-cols-1 place-items-center gap-8 max-w-7xl mx-auto md:grid-cols-3">
      {bookList.map((book) => {
        return <BookCard key={book._id} book={book} />;
      })}
    </div>
  );
};

export default bookList;
