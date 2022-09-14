// import React, { useEffect, useState } from "react";
// import {FileUpload} from './components/FileUpload';
// import "./App.css";
// import TransactionContract from "../src/contracts/Transaction.json"
// import Web3 from 'web3';
// import moment from "moment";
// import Axios from 'axios';
// import Login from './login';
// import Signup from './signup';



// export default function App() {
//   const [fileUrl, setFileUrl] = useState("");
//   const [web3, setWeb3] = useState("");
//   const [account, setAccount] = useState("");
//   const [transactionInstance, setTransactionInstance] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [category, setCategory] = useState("");
//   const [name, setName] = useState("");
//   const [ipfsHash, setIpfsHash] = useState("");
//   const [registrant, setRegsitrant] = useState("");
//   const [responsibleManager, setResponsibleManager] = useState("");
//   const [fileType, setFileType] = useState("");
//   const [fileDescription, setFileDescription] = useState("");
//   const [transactionCnt, setTransactionCnt] = useState("");

//   const [time, setTime] = useState("");
//   const [ipfsHash_, setIpfsHash_] = useState("");
//   const [category_, setCategory_] = useState("");
//   const [name_, setName_] = useState("");
//   const [registrant_, setRegsitrant_] = useState("");
//   const [responsibleManager_, setResponsibleManager_] = useState("");
//   const [fileType_, setFileType_] = useState("");
//   const [fileDescription_, setFileDescription_] = useState("");

//   const submitReview = ()=>{
//     Axios.post('http://localhost:3001/api/insert', {
//       category: category,
//       name: name,
//       time: time,
//       ipfsHash: ipfsHash,
//       registrant: registrant,
//       responsible: responsibleManager,
//       filetype: fileType,
//       filedes: fileDescription
//     }).then(()=>{
//       alert('등록 완료!');
//     })
//   };


//   useEffect(() => {
//     async function componentWillMount(e) {
//       const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
//       setWeb3(web3);
//       console.log(web3)
//       const contract = require("truffle-contract");
//       const transaction = contract(TransactionContract);
//       console.log(web3);
//       transaction.setProvider(web3.currentProvider);
  
//       web3.eth.getAccounts((error, accounts) => {
//         if (!error){
//           transaction.deployed().then(instance => {
//             setTransactionInstance(instance);
//             setAccount(accounts[0]);
//             setLoading(true);
//           })
//         }
//       })
      
//     }

//     componentWillMount();
//     // setTimeout(() => {  console.log("World!"); }, 1000);
//     // updateAllTransactions();

    

//   }, []);


//   useEffect(() => {

//     async function updateAllTransactions(e){
//       let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock:0, toBlock:'latest'});
//       for(let i=0; i<events.length; i+=1){
//         const record = {};
//         var time_ = moment.unix(events[i].returnValues.time);

//         setCategory_(events[i].returnValues.category.toString());
//         setName_(events[i].returnValues.name.toString());
//         setTime(time_.toString());
//         setIpfsHash_(events[i].returnValues.ipfs_hash.toString());
//         setRegsitrant_(events[i].returnValues.registrant.toString());
//         setResponsibleManager_(events[i].returnValues.responsible_manager.toString());
//         setFileType_(events[i].returnValues.file_type.toString());
//         setFileDescription_(events[i].returnValues.file_description.toString());
//         setTransactionCnt(transactionInstance.cntTransactions());
//         console.log(events[i].returnValues);
//       }
//       console.log(events.length);
//       console.log(events);
  
//     }

//     if (loading == true) updateAllTransactions();

// }, [loading]);


//   const sendTransaction = async (e) => {
//     console.log(web3);
//     console.log(account);
//     console.log(transactionInstance);
//     await transactionInstance.sendTrans(category, name, ipfsHash, registrant, responsibleManager, fileType, fileDescription,{
//       from: account,
//       //value: e.web3.utils.toWei('10', "ether"),
//       gas: 1000000
//     })
    
//     let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock: 0, toBlock:'latest'});
//     console.log(events[events.length-1].transactionHash)
//     //this.updateAllTransactions();

//     submitReview();
//   }




//   return (
//     <div>
//       <Login />
//       <Signup />
//       <input type="text" placeholder="Type" onChange = {(event) => setCategory(event.target.value)}></input>
//       <br></br>
//       <input type="text" placeholder="Name" onChange = {(event) => setName(event.target.value)}></input>
//       <br></br>
//       <input type="text" placeholder="Registrant" onChange = {(event) => setRegsitrant(event.target.value)}></input>
//       <br></br>
//       <input type="text" placeholder="Responsible Manager" onChange = {(event) => setResponsibleManager(event.target.value)}></input>
//       <br></br>
//       <input type="text" placeholder="File Type" onChange = {(event) => setFileType(event.target.value)}></input>
//       <br></br>
//       <input type="text" placeholder="File Description" onChange = {(event) => setFileDescription(event.target.value)}></input>
//       <br></br>
      
//       <FileUpload setUrl={setFileUrl} setIpfs={setIpfsHash} />
//       FileUrl :{" "}
//       <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//         {fileUrl}
//       </a>
//       <br></br>

//       <p>Your account: {account}</p>
//       <br></br>

//       <button onClick={sendTransaction}>
//         트랜잭션 추가
//       </button>
//       {/* <button onClick={updateAllTransactions}>
//         트랜잭션 보여주기
//       </button> */}
//       <br></br>

//       <p>all transactions:</p>
//       <br></br>
//       <p>Category: {category_}</p>
//       <p>File Name: {name_}</p>
//       <p>Time: {time}</p>
//       <p>IPFS Hash: {ipfsHash_}</p>
//       <p>Registrant: {registrant_}</p>
//       <p>Responsible Manager: {responsibleManager_}</p>
//       <p>File Type: {fileType_}</p>
//       <p>File Description: {fileDescription_}</p>
//     </div>
//   )
// }





import React, { useRef, useEffect, useState } from "react";
import { Route, Routes,  Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.min.css";

import Ray from "./components/pages/Ray";
import MainSidebar from "./components/layout/MainSidebar/MainSidebar";
import CCTV from "./components/pages/CCTV";
import All from "./components/pages/All";
import Pressure from "./components/pages/Pressure";
import Temp from "./components/pages/Temp";
import CheckList from "./components/pages/CheckList";
import Documents from "./components/pages/Documents";
import Admin from "./components/pages/Admin"

import { Container, Row, Col } from "shards-react";
import MainNavbar from "./components/layout/MainNavbar/MainNavbar";
import MainFooter from "./components/layout/MainFooter";

import WriteTransaction from "./components/pages/WriteTransaction"

import "./App.css";
import TransactionContract from "../src/contracts/Transaction.json"
import Web3 from 'web3';
import moment from "moment";
import Search_Result from "./components/pages/search_result";

export default function App({block_list, transactionInstance, account}) {
  
  console.log("App!!!")

  return(
      <Container fluid>
        <Row>
          <MainSidebar/>
          <Col
            className="main-content p-0"
            lg={{ size: 10, offset: 2 }}
            md={{ size: 9, offset: 3 }}
            sm="12"
            tag="main"
          >
            {<MainNavbar />}
            <Routes>
              <Route path="/" element={<Navigate to="/all"/>} />
              <Route path="/all" element={<All transactionInstance={transactionInstance}/>} />
              <Route path="/cctv" element={<CCTV transactionInstance={transactionInstance}/>} />
              <Route path="/documents" element={<Documents transactionInstance={transactionInstance}/>} />
              <Route path="/checklist" element={<CheckList transactionInstance={transactionInstance}/>} />
              <Route path="/search_result" element={<Search_Result transactionInstance={transactionInstance}/>} />
              <Route path="/temp" element={<Temp transactionInstance={transactionInstance}/>} />
              <Route path="/pressure" element={<Pressure transactionInstance={transactionInstance}/>} />
              <Route path="/ray" element={<Ray transactionInstance={transactionInstance}/>} />
              <Route path="/writetransaction" element={<WriteTransaction transactionInstance={transactionInstance} account={account} />}/>
              <Route path="/admin" element={<Admin transactionInstance={transactionInstance}/>} />
            </Routes>
            <br></br><br></br>
            {<MainFooter />}
          </Col>
        </Row>
      </Container>
  )
};