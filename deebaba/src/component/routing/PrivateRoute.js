import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => {
    return state.auth;
  });

  if (isAuthenticated && !loading) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default PrivateRoute;
