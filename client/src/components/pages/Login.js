import React, { useRef, useEffect, useState } from "react";

import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";

import Connection from '../../blockchain/connection'

import "../../"
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/shards-dashboards.1.1.0.min.css"

import { Link, useNavigate } from 'react-router-dom'
import moment from "moment";
import Axios from 'axios';
import SignUp from './SignUp'

export default function Login()  {
    const [inputId, setinputId] = useState("")
    const [inputPw, setinputPw] = useState("")
    const [signup, setsignup] = useState(false)

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/connect';
        navigate(path);
    }


    const onClickLogin = () => {
        Axios.post('http://localhost:3001/onLogin', null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.msg)
                alert(res.data.msg);
            else{
                sessionStorage.setItem('user_id', inputId)
                sessionStorage.setItem('company', res.data.company)
            }
            document.location.href = '/'
        })
        .catch()
    }


    return (
    <div className="App">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <div className="auth-wrapper">
        &nbsp;&nbsp;&nbsp;
        <div className="auth-inner">
        <Link to={'/'} style ={{textDecoration: "none"}}>
        <h2 style ={{ 
                        fontWeight: "bold"
                        }}>&nbsp;&nbsp;&nbsp;Safety Management</h2>
        </Link>
        <br></br>
        {
            signup ? <SignUp />
            : 
            <div>
            <ListGroup flush>
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <form>
                            <FormGroup>
                                <FormInput id="feInputAddress" size="lg" placeholder="아이디" onChange = {(event) => setinputId(event.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <FormInput
                                type='password'
                                id="feInputAddress2"
                                size="lg"
                                placeholder="비밀번호"
                                onChange = {(event) => setinputPw(event.target.value)}
                                />
                            </FormGroup>
                            <br></br>
                            <Button block size="lg" theme="secondary" className="mb-1 mr-1" onClick={onClickLogin}>로그인</Button>
                            
                            <Button block size="lg" theme="secondary" className="mb-1 mr-1" outline onClick={(event) => setsignup(true)}>
                                회원가입
                            </Button>
                        </form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
        {/* <div className="login">
            <Button onClick={(event) => setsignup(true)}>
                <p stlye ={{  left: "50%",
                                top: "69%",
                                transform: "translate(-50%, -50%)",
                                position: "absolute",
                                color: "#5a6169"}}>회원가입</p>
            </Button>
        </div> */}
        </div>
        }
        
      </div>
      &nbsp;&nbsp;&nbsp;
      </div>
      </div>
    )
}