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


function Search_Result({transactionInstance}){
  
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [block_list, setblock_list] = useState([]);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(false);

  const [detail, setDetail] = useState(false);
  const [detailcnt, setDetailcnt] = useState(-1);

  const detail_click = (cnt) => {
    setDetail(true);
    setDetailcnt(cnt);
  }

  function repeatboardchild(child, start){
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
        if(sessionStorage.getItem('search') === null){
          arr.push(
            <tr key={i} onClick={() => detail_click(i)} style={{cursor: "pointer"}}>
              <th scope="row" >{i+1}</th>
              <td >{child[i].name}</td>
              <td>{child[i].responsible}</td>
              <td>{child[i].filetype}</td>
              <td>{child[i].filedes}</td>
              <td>{child[i].time}</td>
            </tr>
            )
        }
        else if(sessionStorage.getItem('search') === child[i].name || sessionStorage.getItem('search') === child[i].responsible || sessionStorage.getItem('search') === child[i].filetype || sessionStorage.getItem('search') === child[i].filedes){
          arr.push(
            <tr key={i} onClick={() => detail_click(i)} style={{cursor: "pointer"}}>
              <th scope="row" >{i+1}</th>
              <td >{child[i].name}</td>
              <td>{child[i].responsible}</td>
              <td>{child[i].filetype}</td>
              <td>{child[i].filedes}</td>
              <td>{child[i].time}</td>
            </tr>
            )
        }
      }
  
      return arr;
    }

  }


  function Showboard(){

    console.log(first);
    console.log(detail);

    if(!detail && first){
      return (
        <div>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        File Name
                      </th>
                      <th scope="col" className="border-0">
                        Registrant
                      </th>
                      <th scope="col" className="border-0">
                        File Type
                      </th>
                      <th scope="col" className="border-0">
                        File Des
                      </th>
                      <th scope="col" className="border-0">
                        Upload Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {repeatboardchild(block_list, page)}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Pagination
              total={block_list.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
            </div>
      )
    }
    else if (detail && first){
      
      return (
        
        <Row>
          <Col lg="7" md="12">
          <Card small>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Form Example</h6>
          </CardHeader>
            <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                      <label htmlFor="feInputState">카테고리</label>
                      <br></br>
                      {block_list[detailcnt].category}

                      <br></br>
                      <br></br>
                      <label htmlFor="feInputAddress">파일명</label>
                      <br></br>
                      {block_list[detailcnt].name}
                    
                      <br></br>
                      <br></br>
                      <label htmlFor="feInputAddress2">파일 설명</label>
                      <br></br>
                      {block_list[detailcnt].filedes}
                    
                      <br></br>
                      <br></br>
                      <label htmlFor="feInputAddress2">업로더 이름</label>
                      <br></br>
                      {block_list[detailcnt].registrant}
                    
                      <br></br>
                      <br></br>
                      <label htmlFor="feInputAddress2">업로드 책임자</label>
                      <br></br>
                      {block_list[detailcnt].responsible}
                      
                      <br></br>
                      <br></br>
                      <label htmlFor="feInputAddress2">파일 URL</label>
                      <br></br>
                      FileUrl :{" "}
                      <a href={block_list[detailcnt].ipfsHash} target="_blank" rel="noopener noreferrer">
                      {block_list[detailcnt].ipfsHash}
                      </a>
                    
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          </Card>
          </Col>
        </Row>
      )
    }

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
          
          block_list.push({
            id: nextId.current,
            category : events[i].returnValues.category.toString(),
            name : events[i].returnValues.name.toString(),
            time : time_.toString(), 
            ipfsHash : fileurl,
            registrant : events[i].returnValues.registrant.toString(),
            responsible : events[i].returnValues.responsible_manager.toString(),
            filetype : events[i].returnValues.file_type.toString(),
            filedes : events[i].returnValues.file_description.toString()
          }
          )
          
          nextId.current += 1;
  
          console.log(events[i].returnValues);
        }
        setLoading(true);
        setFirst(true);
        console.log('events.length = ', events.length);
        console.log(events);
        console.log('block_list = ', block_list);
      }
  
    }

    updateAllTransactions();
    // sessionStorage.removeItem('search')

}, );

    return(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Results" className="text-sm-left" />
        </Row>
        {Showboard()}
        {/* Default Light Table */}
        {/* <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        File Name
                      </th>
                      <th scope="col" className="border-0">
                        Registrant
                      </th>
                      <th scope="col" className="border-0">
                        File Type
                      </th>
                      <th scope="col" className="border-0">
                        File Des
                      </th>
                      <th scope="col" className="border-0">
                        Upload Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {repeatboardchild(block_list, page)}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Pagination
              total={block_list.length}
              limit={limit}
              page={page}
              setPage={setPage}
            /> */}
      </Container>
    )
}

export default Search_Result;

