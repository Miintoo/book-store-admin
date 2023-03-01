import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/global.css';
import Router from './routes';
import Nav from 'components/commons/Nav';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nav />
    <Router />
  </React.StrictMode>
);
