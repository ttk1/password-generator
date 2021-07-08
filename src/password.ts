export function generatePassword(passwordLength: number, passwordChars: string[]): string {
  const password: string[] = [];
  const random = new Uint32Array(passwordLength);
  window.crypto.getRandomValues(random);
  for (let i = 0; i < passwordLength; i++) {
    password.push(passwordChars[random[i] % passwordChars.length]);
  }
  return password.join('');
}
