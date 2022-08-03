import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../common/PageTitle";
import Pagination from "../pagination.js";


function All({block_list}){
  
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  function repeatboardchild(child, start){
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
      arr.push(
      <tr key={i}>
        <td>{i+1}</td>
        <td>{child[i].name}</td>
        <td>{child[i].responsible}</td>
        <td>{child[i].filetype}</td>
        <td>{child[i].filedes}</td>
        <td>{child[i].time}</td>
      </tr>
      )
    }

    return arr;

  }

    return(
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="All" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
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
      </Container>
    )
}

export default All;

