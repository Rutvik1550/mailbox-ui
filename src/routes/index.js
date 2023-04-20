import { Navigate, useRoutes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import { Routes } from "../utils/constants";
import { lazy } from "react";

export default function Router() {
  return useRoutes([
    {
      path: Routes.home,
      element: <MainLayout />,
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
    { path: Routes.error, element: <>Error</> },
    { element: <Navigate to={Routes.home} replace />, index: true },
  ]);
}

const MailBox = lazy(() => import("../pages/MailBox"));
const Compose = lazy(() => import("../pages/Compose"));
const ReadMail = lazy(() => import("../pages/ReadMail"));
