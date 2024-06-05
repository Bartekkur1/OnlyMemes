import React, { FC, PropsWithChildren, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthClient from '../Api/Auth';
import { Credentials } from '../Types/Auth';
import { jwtDecode } from 'jwt-decode';

export interface User {
  token: string;
  id: number;
  role: string;
}

interface AuthContextType {
  user?: User;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const getTokenDetails = (token: string): { id: number, role: string } => {
  const payload = jwtDecode(token);
  if (payload && typeof payload === 'object' && 'id' in payload && 'role' in payload) {
    return {
      id: Number(payload['id']),
      role: String(payload['role'])
    }
  }
  throw new Error('Invalid token');
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const storedToken = localStorage.getItem('token');

  if (storedToken && user?.token === undefined) {
    setUser({ token: storedToken, ...getTokenDetails(storedToken) });
  }

  const contextValue: AuthContextType = {
    user,
    async login(credentials: Credentials) {
      const token = await AuthClient.login(credentials);
      setUser({
        token,
        ...getTokenDetails(token)
      });
      localStorage.setItem('token', token);
    },
    logout() {
      setUser(undefined);
      localStorage.removeItem('token');
    },
  };
  return <AuthContext.Provider value={contextValue}> {children} </AuthContext.Provider>;
};

const RequireNoAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user && user.token !== undefined) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user || user.token === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  AuthClient.verifyToken(user.token).then((isValid) => {
    if (!isValid) {
      logout();
    }
  });

  return children;
};

const useAuth = () => {
  return React.useContext(AuthContext);
}

export default AuthProvider;
export { useAuth, RequireAuth, RequireNoAuth };
