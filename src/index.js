import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "icheck-bootstrap/icheck-bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "admin-lte/dist/css/alt/adminlte.light.min.css";
import "react-summernote/dist/react-summernote.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

window.jQuery = require("jquery");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
