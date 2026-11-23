import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("No se encontro el nodo #root");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
