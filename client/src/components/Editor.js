import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import CompleteFormExample from "./elements/CompleteFormExample"

function Editor({transactionInstance, account}) {
  return (
    <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">Form</h6>
    </CardHeader>
    <CompleteFormExample transactionInstance={transactionInstance} account={account}/>
  </Card>
  )
};

export default Editor;
