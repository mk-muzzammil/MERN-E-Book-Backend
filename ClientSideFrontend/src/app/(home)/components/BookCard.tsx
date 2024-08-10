import { Book } from "@/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <>
      <div className="flex gap-3  border-2 p-2 shadow-md w-[410px] rounded-xl ">
        <div>
          <Image
            src={book.coverImage}
            alt={book.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "10rem", height: "12rem" }}
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <h1 className="font-bold text-xl text-primary-600 tracking-tight line-clamp-2 text-balance">
            {book.title}
          </h1>
          <p className="font-bold text-primary-900 mt-1">{book.author.name}</p>

          <Link href={`/books/${book._id}`}>
            <button
              type="button"
              className="border-2 border-primary-500 text-primary-500 w-35 h-8 px-2 rounded-xl hover:bg-primary-500 hover:text-white active:bg-primary-700 active:text-white"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BookCard;
