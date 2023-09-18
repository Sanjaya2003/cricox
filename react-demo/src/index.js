import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import home from './pages/home/home';
import { Authcontextprovider } from './context/Authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authcontextprovider>
    <App />
    </Authcontextprovider>
  </React.StrictMode>
);
