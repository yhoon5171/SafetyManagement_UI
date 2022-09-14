import React, { useEffect, useState, useRef } from "react";
// import {FileUpload} from './components/FileUpload';
import TransactionContract from "../contracts/Transaction.json"
import Web3 from 'web3';
import moment from "moment";
import axios from 'axios';
// import Login from './login';
// import Signup from './signup';
import App from '../App.jsx';



export default function Connection() {
  // const [fileUrl, setFileUrl] = useState("");
  // const [web3, setWeb3] = useState("");
  // const [account, setAccount] = useState("");
  // const [transactionInstance, setTransactionInstance] = useState("");
  // const [loading, setLoading] = useState(false);

  // const [category, setCategory] = useState("");
  // const [name, setName] = useState("");
  // const [ipfsHash, setIpfsHash] = useState("");
  // const [registrant, setRegsitrant] = useState("");
  // const [responsibleManager, setResponsibleManager] = useState("");
  // const [fileType, setFileType] = useState("");
  // const [fileDescription, setFileDescription] = useState("");
  // const [transactionCnt, setTransactionCnt] = useState("");

  // const [time, setTime] = useState("");
  // const [ipfsHash_, setIpfsHash_] = useState("");
  // const [category_, setCategory_] = useState("");
  // const [name_, setName_] = useState("");
  // const [registrant_, setRegsitrant_] = useState("");
  // const [responsibleManager_, setResponsibleManager_] = useState("");
  // const [fileType_, setFileType_] = useState("");
  // const [fileDescription_, setFileDescription_] = useState("");

  // const submitReview = ()=>{
  //   Axios.post('http://localhost:3001/api/insert', {
  //     category: category,
  //     name: name,
  //     time: time,
  //     ipfsHash: ipfsHash,
  //     registrant: registrant,
  //     responsible: responsibleManager,
  //     filetype: fileType,
  //     filedes: fileDescription
  //   }).then(()=>{
  //     alert('등록 완료!');
  //   })
  // };


  const [web3, setWeb3] = useState("");
  const [account, setAccount] = useState("");
  const [transactionInstance, setTransactionInstance] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [block_list, setblock_list] = useState([]);

  

  useEffect(() => {
    async function componentWillMount(e) {
      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      setWeb3(web3);
      console.log(web3)
      const contract = require("truffle-contract");
      const transaction = contract(TransactionContract);
      console.log(web3);
      transaction.setProvider(web3.currentProvider);
  
      web3.eth.getAccounts((error, accounts) => {
        if (!error){
          transaction.deployed().then(instance => {
            setTransactionInstance(instance);
            let temp = 0;
            if(sessionStorage.getItem('company') == 'SDS') temp = 0;
            else if(sessionStorage.getItem('company') == 'KLL') temp = 1;
            else if(sessionStorage.getItem('company') == 'KOR') temp = 2;
            else if(sessionStorage.getItem('company') == 'LOS') temp = 3;
            setAccount(accounts[temp]);
            setLoading(true);
          })
        }
      })
      
    }

    componentWillMount();    

  }, []);

  const nextId = useRef(1);

  

  useEffect(() => {

    async function updateAllTransactions(e){
      let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock:0, toBlock:'latest'});
      


      for(let i = 0; i < events.length; i += 1){
        
        var time_ = moment.unix(events[i].returnValues.time);
        
        block_list.push({
          id: nextId.current,
          category : events[i].returnValues.category.toString(),
          name : events[i].returnValues.name.toString(),
          time : time_.toString(), 
          ipfsHash : events[i].returnValues.ipfs_hash.toString(),
          registrant : events[i].returnValues.registrant.toString(),
          responsible : events[i].returnValues.responsible_manager.toString(),
          filetype : events[i].returnValues.file_type.toString(),
          filedes : events[i].returnValues.file_description.toString()
        }
        )
        
        nextId.current += 1;

        console.log(events[i].returnValues);
      }
      console.log('events.length = ', events.length);
      console.log(events);
      console.log('block_list = ', block_list);
      console.log(account);
  
    }

    if (loading == true){
      
      console.log("CCtv data: ")

      axios.post('http://localhost:3001/sendCCTV', null, {
        params: {
        }
      })
      .then(async res => {
        console.log(res)

        let Regsitrant = "Kim"
        let Responsible = "Kim"


        for(let i = 0; i < res.data.length; i++){
          
          
          let Filename = "Sector 1 "
          Filename += res.data[i].time
          let Filedes = "Sector 1 "
          Filedes += res.data[i].time

          await transactionInstance.sendTrans("CCTV", Filename, res.data[i].ipfs_hash, Regsitrant, Responsible, "avi", Filedes,{
            from: account,
            //value: e.web3.utils.toWei('10', "ether"),
            gas: 1000000
          })
        }

      })
      .catch()



      updateAllTransactions();
    }

}, [loading]);



  // const sendTransaction = async (e) => {
  //   console.log(web3);
  //   console.log(account);
  //   console.log(transactionInstance);
  //   await transactionInstance.sendTrans(category, name, ipfsHash, registrant, responsibleManager, fileType, fileDescription,{
  //     from: account,
  //     //value: e.web3.utils.toWei('10', "ether"),
  //     gas: 1000000
  //   })
    
  //   let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock: 0, toBlock:'latest'});
  //   console.log(events[events.length-1].transactionHash)
  //   //this.updateAllTransactions();

  //   submitReview();
  // }




  return (
    <div>
      {/* <Login />
      <Signup />
      <input type="text" placeholder="Type" onChange = {(event) => setCategory(event.target.value)}></input>
      <br></br>
      <input type="text" placeholder="Name" onChange = {(event) => setName(event.target.value)}></input>
      <br></br>
      <input type="text" placeholder="Registrant" onChange = {(event) => setRegsitrant(event.target.value)}></input>
      <br></br>
      <input type="text" placeholder="Responsible Manager" onChange = {(event) => setResponsibleManager(event.target.value)}></input>
      <br></br>
      <input type="text" placeholder="File Type" onChange = {(event) => setFileType(event.target.value)}></input>
      <br></br>
      <input type="text" placeholder="File Description" onChange = {(event) => setFileDescription(event.target.value)}></input>
      <br></br>
      
      <FileUpload setUrl={setFileUrl} setIpfs={setIpfsHash} />
      FileUrl :{" "}
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        {fileUrl}
      </a>
      <br></br>

      <p>Your account: {account}</p>
      <br></br>

      <button onClick={sendTransaction}>
        트랜잭션 추가
      </button>
      {/* <button onClick={updateAllTransactions}>
        트랜잭션 보여주기
      </button> *//*}
      <br></br>

      <p>all transactions:</p>
      <br></br>
      <p>Category: {category_}</p>
      <p>File Name: {name_}</p>
      <p>Time: {time}</p>
      <p>IPFS Hash: {ipfsHash_}</p>
      <p>Registrant: {registrant_}</p>
      <p>Responsible Manager: {responsibleManager_}</p>
      <p>File Type: {fileType_}</p>
      <p>File Description: {fileDescription_}</p> */}
      <App block_list={block_list} transactionInstance={transactionInstance} account={account}/>
    </div>
  )
}