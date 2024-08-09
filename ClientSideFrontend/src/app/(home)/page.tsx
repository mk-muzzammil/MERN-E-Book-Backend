import Image from "next/image";
import Banner from "./components/Banner";
import BookList from "./components/BookList";
export default async function Home() {
  const res = await fetch(`${process.env.BACKEND_URL}/books`, {
    cache: "no-cache",
  });
  const bookList = await res.json();
  if (!res.ok) {
    return new Error("Failed to load books");
  }

  return (
    <>
      <Banner />
      <BookList bookList={bookList.books} />
    </>
  );
}
