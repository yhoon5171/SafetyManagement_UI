import React from "react";
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

import CustomFileUpload from "./CustomFileUpload"

const CompleteFormExample = () => (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <label htmlFor="feInputState">카테고리</label>
                <FormSelect id="feInputState">
                  {/* <option>CCTV</option> */}
                  <option>선택</option>
                  <option>전자문서</option>
                  <option>체크리스트</option>
                  {/* <option>온도 센서</option>
                  <option>압력 센서</option>
                  <option>적외선 센서</option> */}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress">파일명</label>
                <FormInput id="feInputAddress" placeholder="파일명을 입력하세요" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">파일 설명</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="파일 설명을 입력하세요"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">업로더 이름</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="업로더 이름을 입력하세요"
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="feInputAddress2">업로드 책임자</label>
                <FormInput
                  id="feInputAddress2"
                  placeholder="업로드 책임자를 입력하세요"
                />
              </FormGroup>

              <strong className="d-block mb-2">
                파일 업로드
              </strong>
              <CustomFileUpload />
              <Button outline theme="secondary" className="mb-2 mr-1" onClick={() => {window.location.replace("/all")}}>트랜잭션 업로드</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
);

export default CompleteFormExample;
