import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { MapProvider } from "./context/MapProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MapProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MapProvider>
  </React.StrictMode>
);
