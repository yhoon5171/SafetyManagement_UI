import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../common/PageTitle";
import Pagination from "../pagination.js";
import moment from "moment";

import {
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";


function Admin({transactionInstance}){
  
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [block_list, setblock_list] = useState([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(false);

  const [detail, setDetail] = useState(false);
  const [detailcnt, setDetailcnt] = useState(-1);

  const [trans, setTrans] = useState([]);

  const detail_click = (cnt) => {
    setDetail(true);
    setDetailcnt(cnt);
  }

  ////////////////////////////test////////////////////////////////
  function test(child, start){
    if(loading){

      let arr = [];

      if(start == 1) start = 0;
      else{
        start--;
        start *= 10;
      }
  
      let end = start + 10;
  
      if (end > child.length){
        end = child.length;
      }
  
      console.log('child = ', child);
      
      console.log('child.length = %d', child.length);
      for(let i = start; i < end; i++){
        console.log('i = %d, start = %d, end = %d', i, start, end);
        console.log(sessionStorage.getItem('search'));
        // if(sessionStorage.getItem('search') === null){
          arr.push(
            <div>
                <a><b>Time:</b> {child[i].time}</a> <br/>
                <a><b>Address:</b> {child[i].address}</a><br/>
                <a><b>BlockHash:</b> {child[i].blockHash}</a><br/>
                <a><b>BlockNumber:</b> {child[i].blockNumber}</a><br/>
                <a><b>Id:</b> {child[i].id}</a><br/>
                <a><b>LogIndex:</b> {child[i].logIndex}</a><br/>
                <a><b>Signature:</b> {child[i].signature}</a><br/>
                <a><b>TransactionHash:</b> {child[i].transactionHash}</a><br/>
                <a><b>TransactionIndex:</b> {child[i].transactionIndex}</a><br/>
                <a><b>Type:</b> {child[i].type}</a><br/>
                <a><b>Category:</b> {child[i].category}</a><br/>
                <a><b>Name:</b> {child[i].name}</a><br/>
                <a><b>IpfsHash:</b> {child[i].ipfsHash}</a><br/>
                <a><b>Registrant:</b> {child[i].registrant}</a><br/>
                <a><b>Responsible:</b> {child[i].responsible}</a><br/>
                <a><b>Filetype:</b> {child[i].filetype}</a><br/>
                <a><b>Filedes:</b> {child[i].filedes}</a><br/><br/>
            </div>
            )
      }
  
      return arr;
    }

  }


  function ShowTransactions(){

    console.log(first);
    console.log(detail);

      return (
        <div>
        
        <Card small>
            <ListGroup flush>
                <ListGroupItem className="p-3">
                    <Row>
                    <Col>
                        {test(block_list, page)}
                    </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
        </div>
      )

  }


  const nextId = useRef(1);
  
  
  useEffect(() => {


    async function updateAllTransactions(e){
      if(transactionInstance && !first){

        console.log(transactionInstance)
        let events = await transactionInstance.getPastEvents('handleTransaction', {fromBlock:0, toBlock:'latest'});
        
        for(let i = events.length - 1; i >= 0; i--){
          
          var time_ = moment.unix(events[i].returnValues.time);
          var fileurl = 'https://ipfs.infura.io/ipfs/';
          fileurl += events[i].returnValues.ipfs_hash.toString();
          
          console.log(fileurl)
          
          trans.push(events)

          block_list.push({
            id: nextId.current,
            category : events[i].returnValues.category.toString(),
            name : events[i].returnValues.name.toString(),
            time : time_.toString(), 
            ipfsHash : fileurl,
            registrant : events[i].returnValues.registrant.toString(),
            responsible : events[i].returnValues.responsible_manager.toString(),
            filetype : events[i].returnValues.file_type.toString(),
            filedes : events[i].returnValues.file_description.toString(),

            address: events[i].address.toString(),
            blockHash: events[i].blockHash.toString(),
            blockNumber: events[i].blockNumber.toString(),
            id: events[i].id.toString(),
            logIndex: events[i].logIndex.toString(),
            signature: events[i].signature.toString(),
            transactionHash: events[i].transactionHash.toString(),
            transactionIndex: events[i].transactionIndex.toString(),
            type: events[i].type.toString(),

          }
          )
          
          nextId.current += 1;
  
          console.log(events[i].returnValues);
        }
        setLoading(true);
        setFirst(true);
        setTrans(events)
        console.log('events.length = ', events.length);
        console.log(events);
        console.log(trans[0][0]);
        console.log('block_list = ', block_list);
      }
  
    }
    updateAllTransactions();
    sessionStorage.removeItem('search')

}, );

    return(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Transaction Logs" className="text-sm-left" />
        </Row>
        {ShowTransactions()}
      </Container>
    )
}

export default Admin;

