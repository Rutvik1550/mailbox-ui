import "./App.css";

import { AuthWrapper } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import { MailWrapper } from "./context/mail";
import { MainLayout } from "./layout/MainLayout";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <AuthWrapper>
          <MailWrapper>
            <MainLayout>
              <Router />
            </MainLayout>
          </MailWrapper>
        </AuthWrapper>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
