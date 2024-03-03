import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "assets/Styles/index.css";
import 'react-toastify/dist/ReactToastify.css';
import { NextworkControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NextworkControllerProvider>
      <App />
    </NextworkControllerProvider>
  </BrowserRouter>
);
