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

export default function SignUp()  {
  const [CompanySelect, setCompanySelect] = useState("")
  const [ID, setID] = useState("")
  const [Password, setPassword] = useState("")
  const [Password2, setPassword2] = useState("")
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")

  const Company_select = (e) => {
    setCompanySelect(e.target.value);
    console.log(CompanySelect);
  };

  

  const onClickLogin = () => {
    Axios.post('http://localhost:3001/signup', null, {
        params: {
        'id': ID,
        'pw': Password2,
        'nick': ' ',
        'email': Email,
        'name': Name,
        'company': CompanySelect
        }
    })
    .then(res => {
    
      console.log(res)
      alert('등록 완료')
      document.location.href = '/'
    })
    .catch()
  }

  return(
      <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <label htmlFor="feInputState">회사</label>
                <FormSelect id="feInputState" size="lg" style={{fontSize: ".875rem"}} value={CompanySelect} onChange={Company_select}>
                  <option value = "선택">선택</option>
                  <option value = "SDS">SDS</option>
                  <option value = "KLL">KLL</option>
                  <option value = "KOR">KOR</option>
                  <option value = "LOS">LOS</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress">아이디</label>
                <FormInput 
                id="feInputAddress"  
                size="lg" 
                onChange = {(event) => setID(event.target.value)}/>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">비밀번호</label>
                <FormInput
                  id="feInputAddress2"
                  type='password'
                  size="lg"
                  onChange = {(event) => setPassword(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">비밀번호 재확인</label>
                <FormInput
                  id="feInputAddress2"
                  type='password'
                  size="lg"
                  onChange = {(event) => setPassword2(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">이름</label>
                <FormInput
                  id="feInputAddress2"
                  size="lg"
                  onChange = {(event) => setName(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">이메일</label>
                <FormInput
                  id="feInputAddress2"
                  size="lg"
                  onChange = {(event) => setEmail(event.target.value)}
                />
              </FormGroup>
              <br></br>
              <Button block size="lg" theme="secondary" className="mb-1 mr-1" onClick={onClickLogin}>회원가입</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  )
}