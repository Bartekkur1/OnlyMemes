import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const oidcConfig = {
//   onSignIn: () => {
//     console.log('User signed in');
//   },
//   authority: 'https://oidc.io/oauth',
//   clientId: 'this-is-a-client-id',
//   redirectUri: 'https://my-app.com/',
// };

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Login />
    </BrowserRouter>
  </React.StrictMode>
);
