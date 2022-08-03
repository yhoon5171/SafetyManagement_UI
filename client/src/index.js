import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Connection from './blockchain/connection';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Connection />
  </Router>
);