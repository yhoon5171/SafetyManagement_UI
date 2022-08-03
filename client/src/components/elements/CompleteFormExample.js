
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


function CompleteFormExample({transactionInstance, account}){

  const [CategorySelect, setCategorySelect] = useState("")
  const [Filename, setFilename] = useState("")
  const [Filedes, setFiledes] = useState("")
  const [Regsitrant, setRegsitrant] = useState("")
  const [Responsible, setResponsible] = useState("")
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("txt");

  const sendTransaction = async (e) => {
    await transactionInstance.sendTrans(CategorySelect, Filename, fileUrl, Regsitrant, Responsible, fileType, Filedes,{
      from: account,
      //value: e.web3.utils.toWei('10', "ether"),
      gas: 1000000
    })
    
    let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock: 0, toBlock:'latest'});
    console.log(events[events.length-1].transactionHash)
    //this.updateAllTransactions();
    window.location.replace("/all")
    // submitReview();
  }
  
  const category_select = (e) => {
    setCategorySelect(e.target.value);
    console.log(CategorySelect);
  };
  
  const CustomFileUpload = () => (
    <div className="custom-file mb-3">
      <input type="file" className="custom-file-input" id="customFile2" 
                  onChange = {(event) => setFileUrl(event.target.value)}/>
      <label className="custom-file-label" htmlFor="customFile2">
        파일을 선택하세요
      </label>
    </div>
  );

  return(
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <label htmlFor="feInputState">카테고리</label>
                <FormSelect id="feInputState" value={CategorySelect} onChange={category_select}>
                  {/* <option>CCTV</option> */}
                  <option value = "선택">선택</option>
                  <option value = "전자문서">전자문서</option>
                  <option value = "체크리스트">체크리스트</option>
                  {/* <option>온도 센서</option>
                  <option>압력 센서</option>
                  <option>적외선 센서</option>  */}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress">파일명</label>
                <FormInput id="feInputAddress" placeholder="파일명을 입력하세요" onChange = {(event) => setFilename(event.target.value)}/>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">파일 설명</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="파일 설명을 입력하세요"
                  onChange = {(event) => setFiledes(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">업로더 이름</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="업로더 이름을 입력하세요"
                  onChange = {(event) => setRegsitrant(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">업로드 책임자</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="업로드 책임자를 입력하세요"
                  onChange = {(event) => setResponsible(event.target.value)}
                />
              </FormGroup>

              <strong className="d-block mb-2">
                파일 업로드
              </strong>
              <CustomFileUpload />
              <Button outline theme="secondary" className="mb-2 mr-1" onClick={sendTransaction}>트랜잭션 업로드</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  )
                };

export default CompleteFormExample;
