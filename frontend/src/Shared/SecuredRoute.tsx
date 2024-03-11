import React, { FC, ReactElement } from "react";
import { RequireAuth } from "../Context/AuthContext";
import { Route } from "react-router-dom";

interface SecuredRouteProps {
  path: string;
  element: ReactElement;
}

const SecuredRoute = ({ element, path }: SecuredRouteProps) => {
  return <Route path={path} element={<RequireAuth>{element}</RequireAuth>} />
};

export default SecuredRoute;