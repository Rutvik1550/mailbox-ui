import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import { Routes } from "../utils/const";
import withAuthToken from "../hoc/withAuthToken";

const PrivateRoute = ({ token }) => {
  return token ? <Outlet /> : <Navigate to={Routes.error} replace={true} />;
};

export default withAuthToken(PrivateRoute);
