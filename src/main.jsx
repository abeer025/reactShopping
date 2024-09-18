import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./App.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


createRoot(document.getElementById("root")).render(
  <StrictMode>
  <UserContextProvider>
    <CartContextProvider>
    <AppRouter />
    </CartContextProvider>
  </UserContextProvider>
  </StrictMode>
);