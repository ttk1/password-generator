import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Navbar, Table, Form, Row, Col, Button, Card } from 'react-bootstrap';

import { generatePassword } from './password';

const defaultPasswordCount = 20;
const defaultPasswordLength = 20;
const defaultColCount = 5;

const MyForm = (props: { onSubmit: (passwordCount: number, passwordLength: number) => void; handleDownload: () => void }) => {
  const [passwordCount, setPasswordCount] = React.useState(defaultPasswordCount);
  const [passwordLength, setPasswordLength] = React.useState(defaultPasswordLength);

  return (
    <Form className="my-2">
      <Form.Group as={Row}>
        <Form.Label column sm={2}>生成する個数</Form.Label>
        <Col>
          {[20, 50, 100].map((value) => (
            <Form.Check type="radio" id={'radio-password-count-' + value} label={value} value={value} key={value} onChange={() => setPasswordCount(Number(value))} checked={passwordCount == value} />
          ))}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>パスワード長</Form.Label>
        <Col>
          {[8, 12, 16, 20].map((value) => (
            <Form.Check type="radio" id={'radio-password-length-' + value} label={value} value={value} key={value} onChange={() => setPasswordLength(Number(value))} checked={passwordLength == value} />
          ))}
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" className="mx-1" onClick={(event) => { event.preventDefault(); props.onSubmit(passwordCount, passwordLength); }}>
        生成
      </Button>
      <Button type="button" variant="secondary" className="mx-1" onClick={props.handleDownload}>
        ダウンロード
      </Button>
    </Form>
  );
};

function splitPasswordArray(passwords: string[]): string[][] {
  const rows: string[][] = [];
  for (let i = 0; i < passwords.length; i += defaultColCount) {
    rows.push(passwords.slice(i, i + defaultColCount));
  }
  return rows;
}

const PasswordTable = (props: { passwords: string[] }) => {
  return (
    <Table>
      {splitPasswordArray(props.passwords).map((row, index) => (
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

  const handleDownload = () => {
    const blob = new Blob([splitPasswordArray(passwords).map((row) => row.join('\t')).join('\n')], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(blob);

    // aタグを作って無理やりダウンロード
    const a = document.body.appendChild(
      document.createElement('a')
    );
    a.href = blobUrl;
    a.download = 'passwords.tsv';
    a.click();
    document.body.removeChild(a);

    // ちょっと時間空けてrevokeObjectURL
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  };

  return (
    <Container>
      <Navbar>
        <Navbar.Brand>Password Generator</Navbar.Brand>
        <a className="text-dark ml-auto" href="https://github.com/ttk1/password-generator">GitHub</a>
      </Navbar>
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
      <MyForm onSubmit={onSubmit} handleDownload={handleDownload} />
      <PasswordTable passwords={passwords} />
    </Container>
  );
};

window.onload = () => {
  ReactDOM.render(
    <Layout />,
    document.getElementById('root')
  );
};
