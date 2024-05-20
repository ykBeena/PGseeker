import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.user);
  if (user) {
    return <Component />;
  } else {
    return <Navigate to="/login" replace />;
  }

};

export default ProtectedRoute;
