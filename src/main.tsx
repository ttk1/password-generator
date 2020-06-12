import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Navbar, Table, Form, Row, Col, Button, Card } from 'react-bootstrap';

import { generatePassword } from './password';


function getArray(len: number) {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

const MyForm = (props: { rows: number; cols: number; passwordLength: number; onSubmit: (passwords: number, passwordLength: number) => void }) => {
  const [passwords, setPasswords] = React.useState(props.rows * props.cols);
  const [passwordLength, setPasswordLength] = React.useState(props.passwordLength);

  return (
    <Form className="my-2">
      <Form.Group as={Row}>
        <Form.Label column sm={2}>生成個数</Form.Label>
        <Col>
          <Form.Control type="number" value={passwords} onChange={(event) => setPasswords(Number(event.target.value))} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>パスワード長</Form.Label>
        <Col>
          <Form.Control type="number" value={passwordLength} onChange={(event) => setPasswordLength(Number(event.target.value))} />
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" onClick={(event) => { event.preventDefault(); props.onSubmit(passwords, passwordLength); }}>
        生成
      </Button>
    </Form>
  );
};

const PasswordTable = (props: { rows: number; cols: number; passwordLength: number }) => (
  <Table bordered>
    {getArray(props.rows).map((number) => (
      <tr key={number}>
        {getArray(props.cols).map((number) => (
          <td key={number}><pre className="m-0">{generatePassword(props.passwordLength)}</pre></td>
        ))}
      </tr>
    ))}
  </Table>
);

const Layout = () => {
  const [rows, setRows] = React.useState(10);
  const [cols, setCols] = React.useState(5);
  const [passwordLength, setPasswordLength] = React.useState(20);
  const onSubmit = (passwords: number, passwordLength: number) => {
    setRows(passwords / 5);
    setCols(5);
    setPasswordLength(passwordLength);
  };

  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Password Generator</Navbar.Brand>
      </Navbar>
      <Container>
        <Card bg="light" className="my-2">
          <Card.Body>
            <Card.Title>
              免責事項
            </Card.Title>
            <Card.Text>
              生成したパスワードを使用したことによって生じた結果について、いかなる責任も負いません。
              使用は自己責任でお願いします。
            </Card.Text>
          </Card.Body>
        </Card>
        <MyForm rows={rows} cols={cols} passwordLength={passwordLength} onSubmit={onSubmit} />
        <PasswordTable rows={rows} cols={cols} passwordLength={passwordLength} />
      </Container>
    </React.Fragment>
  );
};

window.onload = () => {
  ReactDOM.render(
    <Layout />,
    document.getElementById('root')
  );
};
