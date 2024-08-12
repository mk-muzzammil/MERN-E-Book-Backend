import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./Layouts/DashboardLayout";
import BooksPage from "./pages/BooksPage";
import AuthLayout from "./Layouts/AuthLayout";
import CreateBookPage from "./pages/CreateBookPage";
import EditBookPage from "./pages/EditBookPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,

    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "/books/create_book",
        element: <CreateBookPage />,
      },
      {
        path: "/books/edit_book",
        element: <EditBookPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
export default Router;
