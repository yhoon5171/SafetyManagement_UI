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

export default function Login()  {
    const [Filename, setFilename] = useState("")
    const [Filedes, setFiledes] = useState("")
    const [Regsitrant, setRegsitrant] = useState("")
    const [Responsible, setResponsible] = useState("")
    const [fileUrl, setFileUrl] = useState("");

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/connect';
        navigate(path);
    }
    return (
    <div className="App">
    <div className="auth-wrapper">
        <div className="auth-inner">
        <Link to={'/'}>
        <h2 style ={{  left: "50%",
                        top: "24%",
                        transform: "translate(-50%, -50%)",
                        position: "absolute",
                        fontWeight: "bold"
                        }}>Safety Management</h2>
        </Link>
        <ListGroup flush>
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <form>
                            <FormGroup>
                                <FormInput id="feInputAddress" size="lg" placeholder="아이디" onChange = {(event) => setFilename(event.target.value)}/>
                            </FormGroup>

                            <FormGroup>
                                <FormInput
                                id="feInputAddress2"
                                size="lg"
                                placeholder="비밀번호"
                                onChange = {(event) => setFiledes(event.target.value)}
                                />
                            </FormGroup>
                            <br></br>
                            <Button block size="lg" theme="secondary" className="mb-1 mr-1">로그인</Button>
                        </form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
        <div className="login">
            <Link to={'/sign-up'}>
                <p stlye ={{  left: "50%",
                                top: "69%",
                                transform: "translate(-50%, -50%)",
                                position: "absolute",
                                color: "#5a6169"}}>회원가입</p>
            </Link>
        </div>
      </div>
      </div>
      </div>
    )
}