const passwordChars = [
  // 小文字アルファベット
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  // 大文字アルファベット
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  // 数字
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  // 記号
  '_', '\'', '"', '`', '=', '-', '^', '~', '<', '>', '(', ')', '[', ']', '{', '}', '.', ',', '\\', ':', ';', '+', '*', '%', '$', '#', '@', '|'
];

function getRandomChar() {
  return passwordChars[Math.floor(Math.random() * passwordChars.length)];
}

export function generatePassword(passwordLength: number): string {
  const password: string[] = [];
  for (let i = 0; i < passwordLength; i++) {
    password.push(getRandomChar());
  }
  return password.join('');
}
