import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function Signup() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputNick, setInputNick] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputCom, setInputCom] = useState('')
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    
    const handleInputNick = (e) => {
        setInputNick(e.target.value)
    }
    
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value)
    }
    
    const handleInputName = (e) => {
        setInputName(e.target.value)
    }
    
    const handleInputCom = (e) => {
        setInputCom(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        axios.post('http://ec2-52-78-43-195.ap-northeast-2.compute.amazonaws.com:3001/signup', null, {
            params: {
            'id': inputId,
            'pw': inputPw,
            'nick': inputNick,
            'email': inputEmail,
            'name': inputName,
            'company': inputCom
            }
        })
        .then(res => console.log(res))
        .catch()
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('http://ec2-52-78-43-195.ap-northeast-2.compute.amazonaws.com:3001/login')
        .then(res => console.log(res))
        .catch()
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])
 
    return(
        <div>
            <h2>Signup</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <label htmlFor='input_nick'>Nickname : </label>
                <input type='nickname' name='input_nick' value={inputNick} onChange={handleInputNick} />
            </div>
            <div>
                <label htmlFor='input_email'>Email : </label>
                <input type='email' name='input_email' value={inputEmail} onChange={handleInputEmail} />
            </div>
            <div>
                <label htmlFor='input_name'>Name : </label>
                <input type='name' name='input_name' value={inputName} onChange={handleInputName} />
            </div>
            <div>
                <label htmlFor='input_company'>Company : </label>
                <input type='company' name='input_com' value={inputCom} onChange={handleInputCom} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}
 
export default Signup;