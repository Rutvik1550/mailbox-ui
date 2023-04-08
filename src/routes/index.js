import { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { element: <Navigate to="mailbox" replace />, index: true },
    {
      path: "mailbox",
      element: <MainLayout />,
      children: [
        { path: "", element: <MailBox /> },
        {
          path: "read-mail",
          element: <ReadMail />,
        },
      ],
    },
  ]);
}

const MailBox = Loadable(lazy(() => import("../pages/MailBox")));
const ReadMail = Loadable(lazy(() => import("../pages/ReadMail")));
