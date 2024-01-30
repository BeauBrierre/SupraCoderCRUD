import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

//needed for axios requests
axios.defaults.withCredentials = true;

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
