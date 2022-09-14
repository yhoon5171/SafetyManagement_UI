
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
import { create as ipfsHttpClient } from 'ipfs-http-client'
// const ipfsClient = require('ipfs-http-client');

const projectId = '2DCS0fCRlt3GtE33WGUMaHo05dI';
const projectSecret = '1df2c89edfa1422733bd46ebf81be1fa';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    // apiPath: '/api/v0',
    headers: {
        authorization: auth,
    },
});
// client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
//   console.log(res);
// });

// const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')



function CompleteFormExample({transactionInstance, account}){

  const [CategorySelect, setCategorySelect] = useState("")
  const [Filename, setFilename] = useState("")
  const [Filedes, setFiledes] = useState("")
  const [Regsitrant, setRegsitrant] = useState("")
  const [Responsible, setResponsible] = useState("")
  const [ipfsHash, setIpfsHash] = useState("");
  const [Filetype, setFiletype] = useState("");
  
  const [file, setFile] = useState({})
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)


  const uploadFile = async (e) => {
    // setLoading(true)
    e.preventDefault()

    try {
      console.log('Error ipfs')
        const added = await client.add(file);
        console.log('Error ipfs')
        console.log(file)
        console.log(added)
        const url = `https://safetymanagement.infura-ipfs.io/ipfs/${added.path}`
        console.log(url)
        // setUrl(url)
        setFileUrl(url)
        setUploaded(true)
        setIpfsHash(ipfsHash => added.path)
        setLoading(true)
    } catch (err) {
        console.log('Error uploading the file : ', err)
        setLoading(false)
    }
}

const preUpload = (e) => {
    if (e.target.value !== '') {
        setFile(e.target.files[0])
    } else {
        setFile({})
    }
}

  const sendTransaction = async (e) => {

    let cnt = file.name.length;
    let target = '';
    for(let i = cnt-1; i > 0; i-- ){
      target += file.name[i];
      if(file.name[i] == '.') break;
    }
    let temp = '';
    for(let i = target.length-2; i >= 0; i--){
      temp += target[i];
    }
    console.log(ipfsHash)
    await transactionInstance.sendTrans(CategorySelect, Filename, ipfsHash, Regsitrant, Responsible, temp, Filedes,{
      from: account,
      //value: e.web3.utils.toWei('10', "ether"),
      gas: 1000000
    })
    
    let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock: 0, toBlock:'latest'});
    console.log(events[events.length-1].transactionHash)
    //this.updateAllTransactions();
    window.location.replace("/")
    // submitReview();
  }
  
  const category_select = (e) => {
    setCategorySelect(e.target.value);
    console.log(CategorySelect);
  };
  
  const ipfsupload = (e) => {
    setFileUrl(e.target.value);
    // setFiletype(fileUrl);
    // setLoading(true);
    preUpload(e);
  }

  const uploadbutton = () => {
    if (file.name) {
    return (
      <div>
    {ipfsHash ? (
      <h5>
          Uploaded Successfully ✅
      </h5>
  ) : 
  (
      <Button outline theme="secondary" className="mb-2 mr-1" onClick={uploadFile}>Upload File</Button>
  )}
  </div>
    )
  }
  }

  const CustomFileUpload = () => {

    return (
    <div className="custom-file mb-3">
    <input type="file" className="custom-file-input" id="customFile2" 
                onChange = {ipfsupload}/>
    {file.name ?
    
       (<label className="custom-file-label" htmlFor="customFile2">
       {file.name}
        </label>) : 
        (<label className="custom-file-label" htmlFor="customFile2">
       파일을 선택하세요
        </label>)
    }
    </div>
    )
  }

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
                  <option value = "CCTV">CCTV</option>
                  <option value = "Document">전자문서</option>
                  <option value = "CheckList">체크리스트</option>
                  <option value = "Temp">온도 센서</option>
                  <option value = "Pressure">압력 센서</option>
                  <option value = "Ray">적외선 센서</option>
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
            </Form>
              <CustomFileUpload />
              
              {uploadbutton()}
              <Button outline theme="secondary" className="mb-2 mr-1" onClick={sendTransaction}>트랜잭션 업로드</Button>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  )
                };

export default CompleteFormExample;