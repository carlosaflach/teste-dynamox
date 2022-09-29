import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../Services/handleLocalStorage";

const PrivateRoute = () => {
  const auth = isAuthenticated()

  return (
      auth ?  <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
