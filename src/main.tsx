import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ListGroup, Container, Navbar, Table } from 'react-bootstrap';

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
      <p>ここに生成オプション</p>
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
