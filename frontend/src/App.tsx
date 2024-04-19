import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import AuthProvider, { useAuth } from './Context/AuthContext';
import Home from './Pages/Home/Home';
import SecuredRoute from './Shared/SecuredRoute';
import UnsecuredRoute from './Shared/UnsecuredRoute';
import Upload from './Pages/Upload/Upload';
import Logout from './Pages/Logout/Logout';
import Profile from './Pages/Profile/Profile';
import MemeProvider from './Context/MemeContext';
import { InviteToken } from './Pages/InviteToken/InviteToken';
import { Approve } from './Pages/Approve/Approve';

function App() {
  const { user } = useAuth();
  return (
    <AuthProvider>
      <MemeProvider>
        <Routes>
          {UnsecuredRoute({ element: <Login />, path: '/login' })}
          {UnsecuredRoute({ element: <Register />, path: '/register' })}
          {SecuredRoute({ element: <Home />, path: '/' })}
          {SecuredRoute({ element: <Upload />, path: '/upload' })}
          {SecuredRoute({ element: <Logout />, path: '/logout' })}
          {SecuredRoute({ element: <InviteToken />, path: '/invite' })}
          {SecuredRoute({ element: <Profile />, path: '/profile/:userId' })}
          {SecuredRoute({ element: <Profile />, path: '/profile/:userId' })}
          {SecuredRoute({ user, requiredRole: 'ADMIN', element: <Approve />, path: '/approve' })}
          {<Route path='*' element={<Navigate to={'/'} />} />}
        </Routes>
      </MemeProvider>
    </AuthProvider>
  );
}

export default App;
