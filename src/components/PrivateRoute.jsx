import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { Routes } from "../utils/const";
import { useAuthContext } from "../context/auth";
import withAuthToken from "../hoc/withAuthToken";

const PrivateRoute = ({ token }) => {
  const authContext = useAuthContext();

  return authContext.token ? <Outlet /> : <Navigate to={Routes.error} replace={true} />;
};

export default withAuthToken(PrivateRoute);
