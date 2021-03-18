function getRandomChar(passwordChars) {
  return passwordChars[Math.floor(Math.random() * passwordChars.length)];
}

export function generatePassword(passwordLength: number, passwordChars: string[]): string {
  const password: string[] = [];
  for (let i = 0; i < passwordLength; i++) {
    password.push(getRandomChar(passwordChars));
  }
  return password.join('');
}
