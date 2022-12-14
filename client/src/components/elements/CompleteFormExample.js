
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

// const projectId = '1qmt';
// const projectSecret = 'c920';
// const auth =
//     'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const client = ipfsClient.create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//         authorization: auth,
//     },
// });

const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')



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
        const added = await ipfs.add(file);
        console.log('Error ipfs')
        console.log(file)
        console.log(added)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
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
          Uploaded Successfully ???
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
       ????????? ???????????????
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
                <label htmlFor="feInputState">????????????</label>
                <FormSelect id="feInputState" value={CategorySelect} onChange={category_select}>
                  {/* <option>CCTV</option> */}
                  <option value = "??????">??????</option>
                  <option value = "Document">????????????</option>
                  <option value = "CheckList">???????????????</option>
                  <option value = "CCTV">CCTV</option>
                  <option value = "Temp">?????? ??????</option>
                  <option value = "Pressure">?????? ??????</option>
                  <option value = "Ray">????????? ??????</option>
                  {/* <option>?????? ??????</option>
                  <option>?????? ??????</option>
                  <option>????????? ??????</option>  */}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress">?????????</label>
                <FormInput id="feInputAddress" placeholder="???????????? ???????????????" onChange = {(event) => setFilename(event.target.value)}/>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">?????? ??????</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="?????? ????????? ???????????????"
                  onChange = {(event) => setFiledes(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">????????? ??????</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="????????? ????????? ???????????????"
                  onChange = {(event) => setRegsitrant(event.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">????????? ?????????</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="????????? ???????????? ???????????????"
                  onChange = {(event) => setResponsible(event.target.value)}
                />
              </FormGroup>

              <strong className="d-block mb-2">
                ?????? ?????????
              </strong>
            </Form>
              <CustomFileUpload />
              
              {uploadbutton()}
              <Button outline theme="secondary" className="mb-2 mr-1" onClick={sendTransaction}>???????????? ?????????</Button>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  )
                };

export default CompleteFormExample;
