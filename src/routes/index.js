import { Navigate, useRoutes } from "react-router-dom";

import { lazy } from "react";

export default function Router() {
  return useRoutes([
    {
      path: "mailbox",
      children: [
        {
          path: "",
          element: <MailBox />,
        },
        {
          path: "compose",
          element: <Compose />,
        },
      ],
    },
    { element: <Navigate to="/mailbox" replace />, index: true },
  ]);
}

const MailBox = lazy(() => import("../pages/MailBox"));
const Compose = lazy(() => import("../pages/Compose"));
