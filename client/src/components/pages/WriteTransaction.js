import Editor from "../Editor"
import PageTitle from "../common/PageTitle";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";


function WriteTransaction({transactionInstance}){
    return(
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add New Transaction" className="text-sm-left" />
        </Row>
    

        {/* Editor */}
        <Row>
          <Col lg="7" md="12">
            <Editor transactionInstance={transactionInstance} />
          </Col>
        </Row>

      </Container>
    )
}

export default WriteTransaction;

