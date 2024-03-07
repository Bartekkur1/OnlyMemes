import React from 'react';
import './App.css';
import { AuthProvider } from 'oidc-react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '@mui/icons-material';

const oidcConfig = {
  onSignIn: () => {
    console.log('User signed in');
  },
  authority: 'https://oidc.io/oauth',
  clientId: 'this-is-a-client-id',
  redirectUri: 'https://my-app.com/',
};

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
