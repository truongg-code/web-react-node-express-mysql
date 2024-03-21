import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { ShoppingContextProvide } from "./contexts/ShoppingContext";
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShoppingContextProvide>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ShoppingContextProvide>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
