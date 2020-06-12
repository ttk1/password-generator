import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Navbar, Table, Form, Row, Col, Button, Card } from 'react-bootstrap';

import { generatePassword } from './password';

const defaultPasswordCount = 50;
const defaultPasswordLength = 20;

const MyForm = (props: { onSubmit: (passwords: number, passwordLength: number) => void }) => {
  const [passwords, setPasswords] = React.useState(defaultPasswordCount);
  const [passwordLength, setPasswordLength] = React.useState(defaultPasswordLength);

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

const PasswordTable = (props: { passwords: string[] }) => {
  const rows: string[][] = [];
  for (let i = 0; i < props.passwords.length; i += 5) {
    rows.push(props.passwords.slice(i, i + 5));
  }

  return (
    <Table>
      {rows.map((row, index) => (
        <tr key={index}>
          {row.map((value, index) => (
            <td key={index}><pre className="m-0">{value}</pre></td>
          ))}
        </tr>
      ))}
    </Table>
  );
};

const Layout = () => {
  function generatePasswords(passwordCount: number, passwordLength: number) {
    const passwords: string[] = [];
    for (let i = 0; i < passwordCount; i++) {
      passwords.push(generatePassword(passwordLength));
    }
    return passwords;
  }

  const [passwords, setPasswords] = React.useState(generatePasswords(defaultPasswordCount, defaultPasswordLength));
  const onSubmit = (passwordCount: number, passwordLength: number) => {
    setPasswords(generatePasswords(passwordCount, passwordLength));
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
        <MyForm onSubmit={onSubmit} />
        <PasswordTable passwords={passwords} />
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
