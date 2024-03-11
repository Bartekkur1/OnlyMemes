import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import AuthProvider, { RequireAuth, RequireNoAuth } from './Context/AuthContext';
import Home from './Pages/Home/Home';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={
          <RequireNoAuth>
            <Login />
          </RequireNoAuth>
        } />
        <Route path="/register" element={
          <RequireNoAuth>
            <Register />
          </RequireNoAuth>
        } />
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
