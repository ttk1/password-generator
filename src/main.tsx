import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Container, Navbar, Table, Form, Row, Col, Button, Card } from 'react-bootstrap';

import { generatePassword } from './password';

const defaultPasswordCount = 20;
const defaultPasswordLength = 20;
const defaultColCount = 5;
const defaultPasswordChars = {
  number: [
    // 数字
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ],
  alphabet: [
    // 小文字アルファベット
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    // 大文字アルファベット
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ],
  symbol: [
    // 記号
    '_', '\'', '"', '`', '=', '-', '^', '~', '<', '>', '(', ')', '[', ']', '{', '}', '.', ',', '\\', ':', ';', '+', '*', '%', '$', '#', '@', '|'
  ]
}

const MyForm = (props: {
  onSubmit: (
    passwordCount: number, passwordLength: number,
    usePasswordCharsNumber: boolean, passwordCharsNumber: string,
    usePasswordCharsAlphabet: boolean, passwordCharsAlphabet: string,
    usePasswordCharsSymbol: boolean, passwordCharsSymbol: string
  ) => void; handleDownload: () => void
}) => {
  const [passwordCount, setPasswordCount] = React.useState(defaultPasswordCount);
  const [passwordLength, setPasswordLength] = React.useState(defaultPasswordLength);

  // 数字
  const [usePasswordCharsNumber, setUsePasswordCharsNumber] = React.useState(true);
  const [passwordCharsNumber, setPasswordCharsNumber] = React.useState(defaultPasswordChars.number.join(''));

  // 半角英字
  const [usePasswordCharsAlphabet, setUsePasswordCharsAlphabet] = React.useState(true);
  const [passwordCharsAlphabet, setPasswordCharsAlphabet] = React.useState(defaultPasswordChars.alphabet.join(''));

  // 記号
  const [usePasswordCharsSymbol, setUsePasswordCharsSymbol] = React.useState(true);
  const [passwordCharsSymbol, setPasswordCharsSymbol] = React.useState(defaultPasswordChars.symbol.join(''));

  return (
    <Form className="my-2">
      <Form.Group as={Row}>
        <Form.Label column sm={2}>生成する個数</Form.Label>
        <Col>
          {[20, 50, 100].map((value) => (
            <Form.Check type="radio" id={'radio-password-count-' + value} label={value} key={value} onChange={() => setPasswordCount(Number(value))} checked={passwordCount == value} />
          ))}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>パスワード長</Form.Label>
        <Col>
          {[8, 12, 16, 20].map((value) => (
            <Form.Check type="radio" id={'radio-password-length-' + value} label={value} key={value} onChange={() => setPasswordLength(Number(value))} checked={passwordLength == value} />
          ))}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>使用する文字</Form.Label>
        <Col>
          <Form.Row>
            <Col sm={2} className="d-flex align-items-center">
              <Form.Check type="checkbox" id={'checkbox-password-chars-number'} label="数字" onChange={() => setUsePasswordCharsNumber(!usePasswordCharsNumber)} checked={usePasswordCharsNumber} />
            </Col>
            <Col sm={10}>
              <code><Form.Control size="sm" type="text" className="my-1" onChange={(event) => setPasswordCharsNumber(event.target.value)} value={passwordCharsNumber} /></code>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={2} className="d-flex align-items-center">
              <Form.Check type="checkbox" id={'checkbox-password-chars-alphabet'} label="英字" onChange={() => setUsePasswordCharsAlphabet(!usePasswordCharsAlphabet)} checked={usePasswordCharsAlphabet} />
            </Col>
            <Col sm={10}>
              <code><Form.Control size="sm" type="text" className="my-1" onChange={(event) => setPasswordCharsAlphabet(event.target.value)} value={passwordCharsAlphabet} /></code>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={2} className="d-flex align-items-center">
              <Form.Check type="checkbox" id={'checkbox-password-chars-symbol'} label="記号" onChange={() => setUsePasswordCharsSymbol(!usePasswordCharsSymbol)} checked={usePasswordCharsSymbol} />
            </Col>
            <Col sm={10}>
              <code><Form.Control size="sm" type="text" className="my-1" onChange={(event) => setPasswordCharsSymbol(event.target.value)} value={passwordCharsSymbol} /></code>
            </Col>
          </Form.Row>
        </Col>
      </Form.Group>
      <Button type="submit" variant="primary" className="mx-1" onClick={(event) => {
        event.preventDefault(); props.onSubmit(
          passwordCount, passwordLength,
          usePasswordCharsNumber, passwordCharsNumber,
          usePasswordCharsAlphabet, passwordCharsAlphabet,
          usePasswordCharsSymbol, passwordCharsSymbol
        );
      }}>
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
    <div className="table-responsive">
      <Table>
        <tbody>
          {splitPasswordArray(props.passwords).map((row, index) => (
            <tr key={index}>
              {row.map((value, index) => (
                <td key={index}><code className="m-0">{value}</code></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Layout = () => {
  function generatePasswords(passwordCount: number, passwordLength: number, passwordChars: string[]) {
    const passwords: string[] = [];
    for (let i = 0; i < passwordCount; i++) {
      passwords.push(generatePassword(passwordLength, passwordChars));
    }
    return passwords;
  }

  const [passwords, setPasswords] = React.useState(generatePasswords(
    defaultPasswordCount, defaultPasswordLength,
    defaultPasswordChars.number.concat(defaultPasswordChars.alphabet).concat(defaultPasswordChars.symbol)
  ));
  const onSubmit = (
    passwordCount: number, passwordLength: number,
    usePasswordCharsNumber: boolean, passwordCharsNumber: string,
    usePasswordCharsAlphabet: boolean, passwordCharsAlphabet: string,
    usePasswordCharsSymbol: boolean, passwordCharsSymbol: string
  ) => {
    const passwordChars: string[] = [];
    if (usePasswordCharsNumber) {
      passwordChars.push(...passwordCharsNumber);
    }
    if (usePasswordCharsAlphabet) {
      passwordChars.push(...passwordCharsAlphabet);
    }
    if (usePasswordCharsSymbol) {
      passwordChars.push(...passwordCharsSymbol);
    }
    setPasswords(generatePasswords(passwordCount, passwordLength, passwordChars));
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
