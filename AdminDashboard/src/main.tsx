import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Router from "./router.tsx";
import { RouterProvider } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={Router} />
    <App />
  </StrictMode>
);
