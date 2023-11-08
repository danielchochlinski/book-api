import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import Compose from "./context/ComposeContext.tsx";
import { FavouriteContextProvider } from "./context/FavouriteContext.tsx";
import { BooksContextProvider } from "./context/BooksContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Compose components={[FavouriteContextProvider, BooksContextProvider]}>
      <App />
    </Compose>
  </React.StrictMode>
);
