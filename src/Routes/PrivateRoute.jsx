import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import { getLocalToken } from "../Services/handleLocalStorage";

const PrivateRoute = () => {
  const user = useSelector((state) => state.login);
  const local = getLocalToken();
  const auth = user.email === local.userEmail;

  return (
      auth ?  <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoute;
