import React, { ReactElement } from "react";
import { RequireNoAuth } from "../Context/AuthContext";
import { Route } from "react-router-dom";

interface UnsecuredRouteProps {
  path: string;
  element: ReactElement;
}

const UnsecuredRoute = ({ element, path }: UnsecuredRouteProps) => {
  return <Route path={path} element={<RequireNoAuth>{element}</RequireNoAuth>} />
};

export default UnsecuredRoute;