import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <nav className="max-w-7xl mx-auto flex items-center justify-between border   py-3 border-b-2">
        <div className="flex items-center">
          <Link href={"/"}>
            <div className="relative">
              <Hexagon />
              <BookIcon />
            </div>
          </Link>
          <span className="text-primary-500 tracking-tighter text-xl font-bold">
            Coders Book
          </span>
        </div>
        <div className="flex gap-5 items-center border-solid p-1">
          <button
            type="button"
            className="border-primary-500 text-primary-500 h-8 w-20 text-center rounded-lg hover:border-primary-100 hover:bg-primary-100 active:border-primary-200 active:bg-primary-200 font-medium"
          >
            Sign in
          </button>
          <button
            type="button"
            className="border-primary-500 text-primary-50 h-8 w-20 text-center bg-primary-500 rounded-md hover:bg-primary-600 active:bg-primary-700 font-medium"
          >
            SignUp
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
const Hexagon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    viewBox="0 0 24 24"
    fill="#ce7041"
    stroke="#ce7041"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-hexagon"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#ce7041"
    className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);
