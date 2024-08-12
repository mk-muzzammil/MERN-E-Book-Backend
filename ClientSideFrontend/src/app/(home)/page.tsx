import Image from "next/image";
import Banner from "./components/Banner";
import BookList from "./components/BookList";
import { Suspense } from "react";
import Loader from "@/components/Loader";
export default async function Home() {
  return (
    <>
      <Banner />
      {/* <Suspense fallback={<Loader />}> */}
      <BookList />
      {/* </Suspense> */}
    </>
  );
}
