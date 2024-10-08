export interface InputCreateUser {
  email: string;
  senha: string;
  primeiroNome: string;
  ultimoNome: string;
  setor: string;
  files?: { content: Buffer; filename: string; contentType: string }[];
}
