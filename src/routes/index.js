import { Navigate, useRoutes } from "react-router-dom";

import { MainLayout } from "../layout/MainLayout";
import PrivateRoute from "../components/PrivateRoute";
import { Routes } from "../utils/constants";
import { lazy } from "react";
import { RouteLayout } from "../layout/RouteLayout";

export default function Router() {
  return useRoutes([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: Routes.home,
          element: <RouteLayout />,
          children: [
            {
              path: Routes.mailbox,
              element: <MailBox />,
            },
            {
              path: Routes.compose,
              element: <Compose />,
            },
            {
              path: Routes.readMail,
              element: <ReadMail />,
            },
          ],
        },
      ],
    },
    { path: Routes.error, element: <>Error</> },
    { element: <Navigate to={Routes.home} replace />, index: true },
  ]);
}

const MailBox = lazy(() => import("../pages/MailBox"));
const Compose = lazy(() => import("../pages/Compose"));
const ReadMail = lazy(() => import("../pages/ReadMail"));
