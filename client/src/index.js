// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Connection from './blockchain/connection';
// import {BrowserRouter as Router} from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Router>
//     <Connection />
//   </Router>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Connection from './blockchain/connection';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import FirstPage from './components/pages/FirstPage';
// import All from './components/pages/All';
// import { Navigate } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Router>
//     <Routes>
//         <Route exact path="/" element={<FirstPage />} />
//         <Route path="/connect" element={<Connection />} />
//     </Routes>
//   </Router>
// );



import React, { useRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import Connection from './blockchain/connection';
import FirstPage from './components/pages/FirstPage';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <FirstPage />
  </Router>
);