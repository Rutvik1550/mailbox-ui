import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "icheck-bootstrap/icheck-bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "admin-lte/dist/css/alt/adminlte.light.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
