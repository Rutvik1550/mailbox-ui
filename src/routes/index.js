import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "../layout/MainLayout";
import { lazy } from "react";

export default function Router() {
  return useRoutes([
    {
      path: "mailbox",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <MailBox />,
        },
        {
          path: "compose",
          element: <Compose />,
        },
        {
          path: "read-mail",
          element: <ReadMail />,
        },
      ],
    },
    { element: <Navigate to="/mailbox" replace />, index: true },
  ]);
}

const MailBox = lazy(() => import("../pages/MailBox"));
const Compose = lazy(() => import("../pages/Compose"));
const ReadMail = lazy(() => import("../pages/ReadMail"));
