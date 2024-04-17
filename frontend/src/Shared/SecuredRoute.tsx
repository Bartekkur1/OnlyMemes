import React, { ReactElement } from "react";
import { RequireAuth, User } from "../Context/AuthContext";
import { Route } from "react-router-dom";

interface SecuredRouteProps {
  path: string;
  element: ReactElement;
  requiredRole?: string;
  user?: User;
}

const SecuredRoute = ({ element, path, requiredRole, user }: SecuredRouteProps) => {
  if (requiredRole && user && user.role !== requiredRole) {
    return null;
  }

  return <Route path={path} element={<RequireAuth>{element}</RequireAuth>} />
};

export default SecuredRoute;