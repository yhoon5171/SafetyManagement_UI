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

function Editor({transactionInstance}) {
  return (
    <Card small>
    <CardHeader className="border-bottom">
      <h6 className="m-0">Form Example</h6>
    </CardHeader>
    <CompleteFormExample transactionInstance={transactionInstance}/>
  </Card>
  )
};

export default Editor;
