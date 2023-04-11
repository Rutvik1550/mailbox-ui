import "./App.css";

import { AuthWrapper } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import { MailWrapper } from "./context/mail";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AuthWrapper>
          <MailWrapper>
            <Router />
          </MailWrapper>
        </AuthWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
