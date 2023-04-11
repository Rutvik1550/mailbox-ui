import "./App.css";

import { AuthWrapper } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AuthWrapper>
          <Router />
        </AuthWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
