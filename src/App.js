import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
