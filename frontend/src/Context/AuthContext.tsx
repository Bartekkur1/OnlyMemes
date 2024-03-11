import React, { FC, PropsWithChildren, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthClient from '../Api/Auth';
import { Credentials } from '../Types/Auth';

interface User {
  token: string;
}

interface AuthContextType {
  user?: User;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const storedToken = localStorage.getItem('token');
  if (storedToken && user?.token === undefined) {
    setUser({ token: storedToken });
  }

  const contextValue: AuthContextType = {
    user,
    async login(credentials: Credentials) {
      try {
        const token = await AuthClient.login(credentials);
        setUser({
          token
        });
        localStorage.setItem('token', token);
      } catch (err) {
        console.log('');
      }
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
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.token === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const useAuth = () => {
  return React.useContext(AuthContext);
}

export default AuthProvider;
export { useAuth, RequireAuth, RequireNoAuth };
