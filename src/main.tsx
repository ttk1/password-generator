import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListGroup, Container, Navbar, Table, Form, Col, Button } from 'react-bootstrap';

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
      <Form className="my-2">
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>生成個数</Form.Label>
            <Form.Control type="number" value={N} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>文字数</Form.Label>
            <Form.Control type="number" value="20" />
          </Form.Group>
        </Form.Row>
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
