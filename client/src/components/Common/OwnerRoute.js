import { useContext, useEffect, useState } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import { CakesContext } from "../../contexts/cakeContext";

const OwnerRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthContext();
  const { selectedCake } = useContext(CakesContext);
  const { cakeId } = useParams();

  const currentCake = selectedCake(cakeId);

  if (isAuthenticated && user._id !== currentCake.owner) {
    return <Navigate to="/catalogue" replace />;
  } else if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default OwnerRoute;