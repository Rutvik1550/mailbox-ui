import { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";

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
    { element: <Navigate to="/mailbox" replace />, index: true },
    {
      path: "mailbox",
      element: <MailBox />,
      children: [],
    },
  ]);
}

const MailBox = Loadable(lazy(() => import("../pages/MailBox")));
