// import React from 'react'
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../App.css'
// import { Routes, Route, Link } from 'react-router-dom'

// import Login from './Login'
// import SignUp from './SignUp'
// import MainNavbar from '../layout/MainNavbar/MainNavbar'
// import Connection from '../../blockchain/connection'

// export default function FirstPage() {
//   return (
//     <div className="App">
//     <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//         <div className="container">
//         {<MainNavbar />}
//         <Link className="navbar-brand" to={'/sign-in'}>
//             positronX
//         </Link>
//         <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//             <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//                 <Link className="nav-link" to={'/sign-in'}>
//                 Login
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link className="nav-link" to={'/sign-up'}>
//                 Sign up
//                 </Link>
//             </li>
//             </ul>
//         </div>
//         </div>
//     </nav>

//     <div className="auth-wrapper">
//         <div className="auth-inner">
//         <Routes>
//             <Route exact path="/" element={<Login />} />
//             <Route path="/sign-in" element={<Login />} />
//             <Route path="/sign-up" element={<SignUp />} />
//         </Routes>
//         </div>
//     </div>
//     </div>
//   )
// };

import React from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { Routes, Route, Link } from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'

export default function FirstPage() {
  return (
          <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
          </Routes>
  )
};