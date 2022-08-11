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

import React, { useRef, useEffect, useState } from "react";

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'
import { Routes, Route, Link } from 'react-router-dom'

import Login from './Login'
import SignUp from './SignUp'
import Connection from '../../blockchain/connection';

export default function FirstPage() {
   // 로그인 상태 관리
   const [isLogin, setIsLogin] = useState(false)
 
   useEffect(() => {
     if(sessionStorage.getItem('user_id') === null){
     // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
       console.log('isLogin ?? :: ', isLogin)
     } else {
     // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
     // 로그인 상태 변경
       setIsLogin(true)
       console.log('isLogin ?? :: ', isLogin)
     }
     
    // sessionStorage.removeItem('search')
   })

  return (
    
    <div>

        {isLogin ? 
      	// Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
        <Connection/> : 
        <Login />}
    </div>
  )
};