import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./App.jsx";
import UserContextProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <AppRouter />
  </UserContextProvider>
);