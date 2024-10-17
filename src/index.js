import React from 'react';
import ReactDOM from 'react-dom/client';
import { provider } from 'react-redux';
import store from './store.js';
import './index.css';
import App from './App.js';


const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </provider>
);


