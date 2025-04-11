import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

// Find the root element
const container = document.getElementById("root");
// Create a root
const root = createRoot(container);
// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
