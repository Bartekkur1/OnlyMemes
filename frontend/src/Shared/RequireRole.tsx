import { ReactElement } from "react";
import { useAuth } from "../Context/AuthContext";

interface RequireRoleProps {
  role: string;
  element: ReactElement;
}

const RequireRole = ({ role, element }: RequireRoleProps) => {
  const { user } = useAuth();

  if (user === undefined || user.role !== role) {
    return null;
  }

  return element
};

export default RequireRole;