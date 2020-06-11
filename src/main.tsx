import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListGroup, Container, Navbar, Table, Form, Row, Col, Button, Card } from 'react-bootstrap';

import { generatePassword } from './password';


const N = 10;
const numbers: number[] = [];
for (let i = 0; i < N; i++) {
  numbers.push(i);
}

const Home = () => (
  <React.Fragment>
    <Navbar bg="light" variant="light">
      <Navbar.Brand>Password Generator</Navbar.Brand>
    </Navbar>
    <Container>
      <Card bg="light" className="my-2">
        <Card.Body>
          ほげほげ
        </Card.Body>
      </Card>
      <Form className="my-2">
        <Form.Group as={Row}>
          <Form.Label column sm={2}>生成個数</Form.Label>
          <Col>
            <Form.Control type="number" value={N} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>文字数</Form.Label>
          <Col>
            <Form.Control type="number" value="20" />
          </Col>
        </Form.Group>
        <Button variant="primary" onClick={() => alert('押すなって！')}>
          生成
        </Button>
      </Form>
      <ListGroup>
        <Table bordered>
          {numbers.map((number) => (
            <tr key={number}>
              <td>{generatePassword()}</td>
              <td>{generatePassword()}</td>
              <td>{generatePassword()}</td>
              <td>{generatePassword()}</td>
              <td>{generatePassword()}</td>
            </tr>
          ))}
        </Table>
      </ListGroup>
    </Container>
  </React.Fragment>
);

window.onload = () => {
  ReactDOM.render(
    <Home />,
    document.getElementById('root')
  );
};
