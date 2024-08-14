import React from "react";
import Image from "next/image";
import { Book } from "@/types";
import DownloadButton from "./components/DownloadButton";

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {
  let book: Book | null = null;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/books/${params.bookId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log("res", response);
      throw new Error("Error fetching book");
    }

    book = await response.json();
    console.log(book);
  } catch (err: any) {
    console.log(err + "error");

    throw new Error("Error fetching book");
  }

  if (!book) {
    throw new Error("Book not found");
  }
  console.log(book);
  const bookData = {
    title: book.title,
    authorName: book.author.name,
    description: book.description,
    pdfFile: book.pdfFile,
    coverImage: book.coverImage,
  };
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">
          {bookData.title}
        </h2>
        <span className="font-semibold">by {bookData.authorName}</span>
        <p className="mt-5 text-lg leading-8">{bookData.description}</p>
        <DownloadButton fileLink={bookData.pdfFile} />
      </div>
      <div className="flex justify-end">
        <Image
          src={bookData.coverImage}
          alt={bookData.title}
          className="rounded-md border"
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
